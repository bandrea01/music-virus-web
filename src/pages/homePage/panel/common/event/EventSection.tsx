import {type ReactElement} from "react";
import {type EnrichEvent, type Event} from "@pages";
import {EventCardComponent} from "@components";
import {useDomainGetArtists, useDomainGetVenues} from "@api";
import {Box, Typography} from "@mui/material";

type EventSectionProps = {
  events?: Event[];
}

export default function EventSection({events}: EventSectionProps): ReactElement {

  const {data: artists} = useDomainGetArtists();
  const {data: venues} = useDomainGetVenues();


  const enrichEvents: EnrichEvent[] = events?.map((event) => {
    const artist = artists?.find(artist => artist.userId === event.artistId);
    const venue = venues?.find(venue => venue.userId === event.venueId);
    return {
      ...event,
      artistName: `${artist?.name} ${artist?.surname}`,
      venueName: venue?.venueName ?? ""
    };
  }) ?? [];

  return (
    <>
      {enrichEvents.length === 0 && (
        <Typography variant="h6" color="white" align="center" mt={4}>
          Nessun evento disponibile
        </Typography>
      )}
      <Box sx={{display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: 2}}>
        {enrichEvents?.map((event => (
          <EventCardComponent key={event.eventId} event={event}/>
        )))}
      </Box>
    </>

  );
};