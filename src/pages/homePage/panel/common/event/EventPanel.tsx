import {CheckboxFilterBar, ScreenSpinner, PanelPaperComponent} from "@components";
import {Box, Divider} from "@mui/material";
import {type ReactElement, useMemo, useState} from "react";
import {useDomainGetArtists, useDomainGetVenues, useGetEvents} from "@api";
import {type EnrichEvent, EventMapSection, EventPanelActions, EventSection} from "@pages";
import {
  type ActionProps,
  type EventStatusKey,
  type StatusFilters,
  buildEnrichedEvent,
  getFilterOptions,
  filterStatusInitialState,
  filterVenueInitialState,
  filterArtistInitialState
} from "@utils";

export default function EventPanel(): ReactElement {
  const {data: venues, isLoading: isLoadingVenues} = useDomainGetVenues();
  const {data: artists, isLoading: isLoadingArtists} = useDomainGetArtists();
  const {data: events, isLoading: isLoadingEvents} = useGetEvents();

  const [showStatusFilterBar, setShowStatusFilterBar] = useState<boolean>(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusFilters>(filterStatusInitialState);
  const [selectedVenueFilter, setSelectedVenueFilter] = useState<string>(filterVenueInitialState);
  const [selectedArtistFilter, setSelectedArtistFilter] = useState<string>(filterArtistInitialState);


  const actions: ActionProps [] = useMemo(
    () => {
      return EventPanelActions(
        artists,
        venues,
        setShowStatusFilterBar,
        setSelectedVenueFilter,
        setSelectedArtistFilter
      )
    }, [artists, venues]
  );

  const handleToggleStatusFilter = (eventStatus: EventStatusKey, checked: boolean) => {
    setSelectedStatusFilter((prev) => ({
      ...prev,
      [eventStatus]: checked,
    }));
  };

  const filteredAndSortedEvents: EnrichEvent[] | undefined = useMemo(
    () =>
      buildEnrichedEvent({
        events,
        artists,
        venues,
        statusFilters: selectedStatusFilter,
        venueFilter: selectedVenueFilter,
        artistFilter: selectedArtistFilter,
      }),
    [
      events,
      selectedStatusFilter,
      selectedVenueFilter,
      selectedArtistFilter,
      artists,
      venues
    ]
  );

  const isLoading = isLoadingVenues || isLoadingArtists || isLoadingEvents;

  return (
    <>
      {
        isLoading ?
          <ScreenSpinner/> :
          <PanelPaperComponent
            title="Eventi"
            actions={actions}
            filtersContent={
              showStatusFilterBar ? (
                <CheckboxFilterBar
                  options={getFilterOptions(selectedStatusFilter)}
                  onChange={handleToggleStatusFilter}
                />
              ) : null
            }
          >
            <Box display="flex" gap={1}>
              <Box width="60%">
                <EventSection events={filteredAndSortedEvents}/>
              </Box>
              <Divider color={"#fafafa"} orientation="vertical" variant="middle" flexItem/>
              <Box width="40%">
                <EventMapSection/>
              </Box>
            </Box>
          </PanelPaperComponent>
      }
    </>
  )
};