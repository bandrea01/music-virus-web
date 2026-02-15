import {DialogComponent} from "@components";
import type {ReactElement} from "react";
import QRCode from "react-qr-code";
import {type EnrichTicket, PromotionType} from "@pages";
import {Box, Typography} from "@mui/material";
import FestivalIcon from "@mui/icons-material/Festival";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {formatDateWithTime} from "@utils";

type QRDialogComponentProps = {
  open: boolean;
  ticket: EnrichTicket;
  onClose: () => void;
}

export default function QRDialogComponent({
                                            open,
                                            ticket,
                                            onClose
                                          }: QRDialogComponentProps): ReactElement {
  return (
    <DialogComponent
      isOpen={open}
      title="Biglietto QR Code"
      onClose={onClose}
      actions={[
        {label: "Chiudi", onClick: onClose},
      ]}
      maxWidth="md"
    >
      <Box display="flex" justifyContent="center" gap={4}>
        <QRCode value={ticket.ticketCode} size={240}/>
        <Box display="flex" flexDirection="column" justifyContent="center" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <QrCodeScannerIcon sx={{color: 'white'}}/>
            <Typography fontSize="15px" color="white" fontWeight="bold">
              {ticket.ticketId}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <FestivalIcon sx={{color: 'white'}}/>
            <Typography fontSize="15px" color="white" fontWeight="bold">
              {ticket.eventName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{color: 'white'}}/>
            <Typography fontSize="15px" color="white" fontWeight="bold">
              {formatDateWithTime(ticket.eventDate!)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoneyIcon sx={{color: 'white'}}/>
            <Typography fontSize="15px" color="white" fontWeight="bold">
              Contributo: €{ticket.contributionAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocalActivityIcon sx={{color: 'white'}}/>
            <Typography fontSize="15px" color="white" fontWeight="bold">
              Promozione: {PromotionType[ticket.venuePromotion]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </DialogComponent>
  );
}