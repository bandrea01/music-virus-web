import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddEditFundraisingDialog from "@pages/homePage/panel/artist/fundraising/AddEditFundraisingDialog.tsx";
import {useMemo, useState} from "react";
import {useGetFundraising} from "@pages/homePage/hooks/useFundraising.ts";
import {CheckboxFilterBar, useAuth} from "@components";
import {type EnrichFundraising, type Fundraising, useGetArtists, useGetVenues} from "@pages";
import {FundraisingCardComponent} from "@components/FundraisingCardComponent.tsx";
import {
    buildEnrichedFundraisings,
    FUNDRAISING_STATUS_ORDER,
    FundraisingStatusEnum,
    type FundraisingStatusKey
} from "@utils";
import type {ActionProps} from "@utils/types/types.ts";

const filterStatusLabel: Record<FundraisingStatusKey, string> = {
    [FundraisingStatusEnum.CONFIRMED]: "Confermate",
    [FundraisingStatusEnum.ACTIVE]: "Attive",
    [FundraisingStatusEnum.ACHIEVED]: "Raggiunte",
    [FundraisingStatusEnum.NOT_ACHIEVED]: "Non raggiunte",
    [FundraisingStatusEnum.CANCELLED]: "Cancellate",
};

const GeneralFundraisingPanel = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedFundraising, setSelectedFundraising] = useState<Fundraising | undefined>(undefined);

    //Filters
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [statusFilters, setStatusFilters] = useState<Record<FundraisingStatusKey, boolean>>({
        [FundraisingStatusEnum.CONFIRMED]: true,
        [FundraisingStatusEnum.ACTIVE]: true,
        [FundraisingStatusEnum.ACHIEVED]: true,
        [FundraisingStatusEnum.NOT_ACHIEVED]: true,
        [FundraisingStatusEnum.CANCELLED]: true,
    });

    //User ID
    const {profileUser} = useAuth();
    const userId = profileUser?.userId ?? "";

    //datas
    const {data: venuesData, isLoading: isLoadingVenues} = useGetVenues();
    const {data: artistsData, isLoading: isLoadingArtists} = useGetArtists();
    const {
        data: fundraisingsData,
        isLoading: isLoadingFundraising
    } = useGetFundraising();

    const venues = venuesData?.venues ?? [];
    const artists = artistsData?.artists ?? [];
    const personalFundraisings = fundraisingsData?.fundraisings ?? [];

    const fundraisings: EnrichFundraising[] = useMemo(
        () =>
            buildEnrichedFundraisings({
                personalFundraisings,
                artists,
                venues,
                statusFilters,
            }),
        [personalFundraisings, artists, venues, statusFilters]
    );

    //Actions
    const actions: ActionProps[] = [
        {
            label: 'Filtra',
            onClick: () => setShowFilters(prev => !prev),
            startIcon: <FilterListIcon/>
        }
    ];

    const isLoading = isLoadingVenues || isLoadingArtists || isLoadingFundraising;

    const handleToggleStatusFilter = (status: FundraisingStatusKey, checked: boolean) => {
        setStatusFilters((prev) => ({
            ...prev,
            [status]: checked,
        }));
    };

    const filterOptions = FUNDRAISING_STATUS_ORDER.map((status) => ({
        value: status,
        label: filterStatusLabel[status],
        checked: statusFilters[status],
    }));

    return (
        <PanelPaperComponent
            title="Raccolte fondi"
            actions={actions}
            filtersContent={
                showFilters ? (
                    <CheckboxFilterBar
                        options={filterOptions}
                        onChange={handleToggleStatusFilter}
                    />
                ) : null
            }
        >
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={2}>
                {!isLoading && fundraisings.map((fundraising) => (
                    <FundraisingCardComponent
                        fundraising={fundraising}
                        setSelectedFundraising={setSelectedFundraising}
                        setIsEditDialogOpen={setIsDialogOpen}
                    />
                ))}
            </Box>

            {isDialogOpen && (
                <AddEditFundraisingDialog
                    isDialogOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    fundraising={selectedFundraising}
                    venues={venues}
                    userId={userId}
                />
            )}
        </PanelPaperComponent>
    );
};

export default GeneralFundraisingPanel;
