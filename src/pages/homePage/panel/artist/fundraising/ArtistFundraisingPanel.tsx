import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArtistCreateFundraisingDialog from "@pages/homePage/panel/artist/fundraising/ArtistCreateFundraisingDialog.tsx";
import {useMemo, useState} from "react";
import {useGetPersonalFundraisingList} from "@pages/homePage/hooks/useFundraising.ts";
import {CheckboxFilterBar, useAuth} from "@components";
import {type EnrichFundraising, useGetArtists, useGetVenues} from "@pages";
import {FundraisingCardComponent} from "@components/FundraisingCardComponent.tsx";
import {getActionsFromStatus} from "@pages/homePage/panel/artist/fundraising/ArtistFundraisingCardActions.tsx";
import {
    buildEnrichedFundraisings,
    FUNDRAISING_STATUS_ORDER,
    FundraisingStatusEnum,
    type FundraisingStatusKey
} from "@utils";
import type {ActionProps} from "@utils/types/types.ts";

const filterStatusLabel: Record<FundraisingStatusKey, string> = {
    [FundraisingStatusEnum.ACTIVE]: "Attive",
    [FundraisingStatusEnum.ACHIEVED]: "Raggiunte",
    [FundraisingStatusEnum.NOT_ACHIEVED]: "Non raggiunte",
    [FundraisingStatusEnum.CANCELLED]: "Cancellate",
};

const ArtistFundraisingPanel = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const [statusFilters, setStatusFilters] = useState<Record<FundraisingStatusKey, boolean>>({
        [FundraisingStatusEnum.ACTIVE]: true,
        [FundraisingStatusEnum.ACHIEVED]: true,
        [FundraisingStatusEnum.NOT_ACHIEVED]: true,
        [FundraisingStatusEnum.CANCELLED]: true,
    });

    const {profileUser} = useAuth();
    const userId = profileUser?.userId ?? "";

    const {data: venuesData, isLoading: isLoadingVenues} = useGetVenues();
    const {data: artistsData, isLoading: isLoadingArtists} = useGetArtists();
    const {
        data: personalFundraisingData,
        isLoading: isLoadingFundraising
    } = useGetPersonalFundraisingList(userId);

    const venues = venuesData?.venues ?? [];
    const artists = artistsData?.artists ?? [];
    const personalFundraisings = personalFundraisingData?.fundraisings ?? [];

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

    const actions: ActionProps[] = [
        {
            label: 'Nuova Raccolta Fondi',
            onClick: () => setIsDialogOpen(true),
            startIcon: <AddIcon/>
        },
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
            title="Le tue raccolte fondi"
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
                        key={fundraising.fundraisingId}
                        fundraising={fundraising}
                        buttons={getActionsFromStatus(
                            fundraising.status as FundraisingStatusKey,
                            fundraising.fundraisingId
                        )}
                    />
                ))}
            </Box>

            {isDialogOpen && (
                <ArtistCreateFundraisingDialog
                    isDialogOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    venues={venues}
                    userId={userId}
                />
            )}
        </PanelPaperComponent>
    );
};

export default ArtistFundraisingPanel;
