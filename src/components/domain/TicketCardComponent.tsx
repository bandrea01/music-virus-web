import type {EnrichTicket} from "@pages";
import {type ReactElement, useState} from "react";
import {Box, Typography} from "@mui/material";
import {formatDateWithTime} from "@utils";
import QrCodeIcon from '@mui/icons-material/QrCode';
import {QRDialogComponent} from "@components";

type TicketCardComponentProps = {
  ticket: EnrichTicket;
}

function getTicketStatusColorAndLabel(status: string): { color: string; label: string } {
  switch (status) {
    case "ACTIVE":
      return { color: '#22c55e', label: 'Valido' };
    case "USED":
      return { color: '#cda221', label: 'Usato' };
    case "CANCELLED":
      return { color: '#aa3131', label: 'Annullato' };
    default:
      return { color: '#6b7280', label: status };
  }
}

export default function TicketCardComponent({
                                              ticket,
                                            }: TicketCardComponentProps): ReactElement {

  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);

  const {label: statusLabel, color: statusColor} = getTicketStatusColorAndLabel(ticket.status);

  return (
    <Box
      className="approveRequestCard"
      onClick={() => {
        if (isQRDialogOpen) return;
        setIsQRDialogOpen(true);
      }}
    >
      <QrCodeIcon sx={{ fontSize: 70, color: 'white', marginRight: 2 }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" color='white' fontWeight="bold">
            {ticket.eventName}
          </Typography>
          <Typography variant="h6" color='white' fontWeight="bold">
            {formatDateWithTime(ticket.eventDate!)}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography fontSize="15px" color='white' fontWeight="bold">
            Ticket ID: {ticket.ticketId}
          </Typography>
          <Typography fontSize="15px" color={statusColor} fontWeight="bold">
            Stato: {statusLabel}
          </Typography>
        </Box>
      </Box>
      {
        isQRDialogOpen && (
          <QRDialogComponent
            open={isQRDialogOpen}
            ticket={ticket}
            onClose={() => setIsQRDialogOpen(false)}
          />
        )
      }
    </Box>
  );
}