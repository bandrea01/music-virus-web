import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Typography} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import {type ReactElement, useMemo, useState} from "react";
import {useGetPersonalFundraisingList} from "@api/hooks/useFundraising.ts";
import {CheckboxFilterBar, ScreenSpinner, useAuth} from "@components";
import {type EnrichFundraising, type Fundraising, PromotionDialog} from "@pages";
import {FundraisingCardComponent} from "@components";
import {
  buildEnrichedFundraisings,
  FUNDRAISING_STATUS_ORDER,
  FundraisingStatusEnum,
  type FundraisingStatusKey
} from "@utils";
import type {ActionProps} from "@utils/types/types.ts";
import {useDomainGetArtists, useDomainGetVenues} from "@api";

const filterStatusLabel: Record<FundraisingStatusKey, string> = {
  [FundraisingStatusEnum.CONFIRMED]: "Confermate",
  [FundraisingStatusEnum.ACTIVE]: "Attive",
  [FundraisingStatusEnum.ACHIEVED]: "Raggiunte",
  [FundraisingStatusEnum.NOT_ACHIEVED]: "Non raggiunte",
  [FundraisingStatusEnum.CANCELLED]: "Cancellate",
};

export default function VenueFundraisingPanel(): ReactElement {
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState<boolean>(false);
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
  const {authUser} = useAuth();
  const userId = authUser?.userId ?? "";

  //datas
  const {data: artistsData, isLoading: isLoadingArtists} = useDomainGetArtists();
  const {data: venuesData, isLoading: isLoadingVenues} = useDomainGetVenues();
  const {data: personalFundraisingData, isLoading: isLoadingFundraising} = useGetPersonalFundraisingList();

  const venues = venuesData ?? [];
  const artists = artistsData ?? [];
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

  const isLoadingPage = isLoadingArtists || isLoadingVenues || isLoadingFundraising;

  return (
    isLoadingPage ?
      <ScreenSpinner/> :
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
        {
          fundraisings.length === 0 && (
            <Typography variant="h6" color="white" align="center" mt={4}>
              Nessuna raccolta fondi disponibile
            </Typography>
          )
        }
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={2}>
          {!isLoading && fundraisings.map((fundraising) => (
            <FundraisingCardComponent
              fundraising={fundraising}
              setSelectedFundraising={setSelectedFundraising}
              setIsPromotionDialogOpen={setIsPromotionDialogOpen}
              isInPersonalPanel={true}
              isVenuePanel={true}
            />
          ))}
        </Box>

        {isPromotionDialogOpen && (
          <PromotionDialog
            isDialogOpen={isPromotionDialogOpen}
            onClose={() => {
              setIsPromotionDialogOpen(false);
              setSelectedFundraising(undefined);
            }}
            fundraising={selectedFundraising}
            userId={userId}
          />
        )}
      </PanelPaperComponent>
  );
};