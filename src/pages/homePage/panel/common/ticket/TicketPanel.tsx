import type {ReactElement} from "react";
import {PanelPaperComponent, TicketCardComponent, useAuth} from "@components";
import {useGetEvents, useGetTickets} from "@api";
import {type EnrichTicket, PromotionType} from "@pages";
import {Typography} from "@mui/material";

type TicketPanelProps = {};

export default function TicketPanel({}: TicketPanelProps): ReactElement {
  const {authUser} = useAuth();
  const {data: ticketsData} = useGetTickets(authUser?.userId ?? "");
  const {data: events} = useGetEvents();

  const tickets: EnrichTicket[] = ticketsData?.map(ticket => {
    const event = events?.find(e => e.eventId === ticket.eventId);
    if (event) {
      return {
        ...ticket,
        eventName: event.eventName,
        eventDate: event.eventDate,
        venuePromotion: event?.venuePromotion ?? PromotionType.NONE,
      };
    }
    return ticket;
  }) ?? [];

  return (
    <PanelPaperComponent title="I Miei Biglietti">
      {tickets && tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketCardComponent
            key={ticket.ticketId}
            ticket={ticket}
          />
        ))
      ) : (
        <Typography variant="h6" color="white" align="center" mt={4}>
          Non hai ricevuto ancora nessun biglietto
        </Typography>
      )}
    </PanelPaperComponent>
  );
}
