import {CheckboxFilterBar, FundraisingCardComponent, PanelPaperComponent, useAuth} from "@components";
import {Box, Typography} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import AddEditFundraisingDialog from "@pages/homePage/panel/artist/fundraising/AddEditFundraisingDialog.tsx";
import {type ReactElement, useMemo, useState} from "react";
import {useGetFundraising} from "@api/hooks/useFundraising.ts";
import {ContributionDialog, type EnrichFundraising, type Fundraising} from "@pages";
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

export default function GeneralFundraisingPanel(): ReactElement {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isContributionDialogOpen, setIsContributionDialogOpen] = useState<boolean>(false);
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
  const {data: venues, isLoading: isLoadingVenues} = useDomainGetVenues();
  const {data: artists, isLoading: isLoadingArtists} = useDomainGetArtists();
  const {
    data: fundraisingsData,
    isLoading: isLoadingFundraising
  } = useGetFundraising();

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
      {fundraisings.length === 0 && (
        <Typography variant="h6" color="white" align="center" mt={4}>
          Nessuna raccolta fondi disponibile
        </Typography>
      )}
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={2}>
        {!isLoading && fundraisings.map((fundraising) => (
          <FundraisingCardComponent
            fundraising={fundraising}
            setSelectedFundraising={setSelectedFundraising}
            setIsEditDialogOpen={setIsEditDialogOpen}
            setIsContributionDialogOpen={setIsContributionDialogOpen}
          />
        ))}
      </Box>

      {isEditDialogOpen && (
        <AddEditFundraisingDialog
          isDialogOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          fundraising={selectedFundraising}
          venues={venues ?? []}
          userId={userId}
        />
      )}
      {isContributionDialogOpen && (
        <ContributionDialog
          isDialogOpen={isContributionDialogOpen}
          onClose={() => setIsContributionDialogOpen(false)}
          fundraising={selectedFundraising!}
          userId={userId}
        />
      )}
    </PanelPaperComponent>
  );
};