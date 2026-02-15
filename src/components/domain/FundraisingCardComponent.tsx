import {type ReactElement} from "react";
import {
  type EnrichFundraising,
  type Fundraising,
  getActionsFromStatus,
  PromotionType,
  type PromotionTypeKey
} from "@pages";
import {formatDateWithTime, FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";
import {Avatar, Box, Button, Card, Divider, Slider, Tooltip, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

type FundraisingCardComponentProps = {
  fundraising: EnrichFundraising;
  setSelectedFundraising: (fundraising: Fundraising | undefined) => void;
  setIsEditDialogOpen?: (open: boolean) => void;
  setIsContributionDialogOpen?: (open: boolean) => void;
  setIsPromotionDialogOpen?: (open: boolean) => void;
  isInPersonalPanel?: boolean;
  isVenuePanel?: boolean;
}
type Palette = {
  backgroundColor: string;
  statusColor: string;
  sliderColor: string;
}

const STATUS_PALETTE: Record<FundraisingStatusKey, Omit<Palette, 'sliderColor'>> = {
  [FundraisingStatusEnum.ACTIVE]: {
    backgroundColor: '#0F172A',
    statusColor: '#E5E7EB',
  },
  [FundraisingStatusEnum.ACHIEVED]: {
    backgroundColor: '#201735',
    statusColor: '#E3B7FF',
  },
  [FundraisingStatusEnum.CANCELLED]: {
    backgroundColor: '#1F2933',
    statusColor: '#9CA3AF',
  },
  [FundraisingStatusEnum.NOT_ACHIEVED]: {
    backgroundColor: 'rgba(59,47,26,0.73)',
    statusColor: '#FACC15',
  },
  [FundraisingStatusEnum.CONFIRMED]: {
    backgroundColor: '#103827',
    statusColor: '#BBF7D0',
  },
};

function getSliderColor(status: FundraisingStatusKey, percentage: number): string {
  if (status === FundraisingStatusEnum.CANCELLED) {
    return 'rgb(107, 114, 128)';
  }
  const value = Math.max(0, Math.min(100, percentage));

  if (value === 0) {
    return 'rgb(220, 38, 38)';
  }
  if (value > 0 && value < 50) {
    return 'rgb(234, 88, 12)';
  }
  if (value >= 50 && value < 100) {
    return 'rgb(250, 204, 21)';
  }
  return 'rgb(34, 197, 94)';
}

function getPalette(status: FundraisingStatusKey, percentage: number): Palette {
  const sliderColor = getSliderColor(status, percentage);
  const statusPalette = STATUS_PALETTE[status] ?? {
    backgroundColor: '',
    statusColor: '',
  };

  return {
    ...statusPalette,
    sliderColor,
  };
}


export default function FundraisingCardComponent({
                                                   fundraising,
                                                   setIsEditDialogOpen,
                                                   setIsContributionDialogOpen,
                                                   setIsPromotionDialogOpen,
                                                   setSelectedFundraising,
                                                   isInPersonalPanel = false,
                                                   isVenuePanel = false,
                                                 }: FundraisingCardComponentProps): ReactElement {

  const {backgroundColor, statusColor, sliderColor} = getPalette(
    fundraising.status as FundraisingStatusKey,
    (fundraising.currentAmount / fundraising.targetAmount) * 100
  );

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: `${backgroundColor} !important`,
        borderWidth: "3px !important",
        padding: "20px",
        borderRadius: "15px",
        opacity: "100%",
        minHeight: "200px",
        minWidth: "300px",
        "&:hover": {cursorPointer: "pointer"}
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1}>
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <Box>
            <Tooltip title={fundraising.artistName} arrow>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '10px',
                  objectFit: 'cover',
                  backgroundColor: '#335998',
                }}
                variant="square"
              >
                {fundraising.artistName.split(' ')[0].charAt(0)}{fundraising.artistName.split(' ')[1].charAt(0)}
              </Avatar>
            </Tooltip>
          </Box>
          <Box display="flex" flexDirection="column" overflow="hidden">
            <Box display="flex" justifyContent="space-between" gap={0.5} width="400px">
              <Typography fontSize="20px" color="white" fontWeight="bold"
                          sx={{textDecoration: 'underline'}}>
                {fundraising.fundraisingName}
              </Typography>
            </Box>
            <Typography fontSize="12px" color="#fff">
              Somma raccolta: {fundraising.currentAmount}€ / {fundraising.targetAmount}€<br/>
              Scadenza: {formatDateWithTime(fundraising.expirationDate)}
            </Typography>
          </Box>
          <Box alignSelf="start" padding={'9px'}>
            <Typography fontSize="11px" color={statusColor} noWrap={true} fontWeight="bold">
              {fundraising.status.replace('_', ' ')}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" width="100%" gap={1}>
          <CalendarMonthIcon sx={{color: 'white'}}/>
          <Typography fontWeight="bold" color="white" fontSize="13px">
            {formatDateWithTime(fundraising.eventDate)}
          </Typography>
          <LocationPinIcon sx={{color: 'white', marginLeft: '20px'}}/>
          <Typography fontWeight="bold" color="white" fontSize="13px">
            {fundraising.venueName}
          </Typography>
          {
            fundraising.venuePromotion !== "NONE" && (
              <Tooltip
                title={`Promozione attiva: ${PromotionType[fundraising.venuePromotion as PromotionTypeKey]}`}
                arrow
              >
                <LocalActivityIcon sx={{color: '#BBF7D0', marginLeft: '20px'}}/>
              </Tooltip>
            )
          }
        </Box>
        <Box display="flex" alignItems="center" width="100%" gap={1}>
          <Slider
            value={(fundraising.currentAmount / fundraising.targetAmount) * 100}
            sx={{
              width: '100%',
              color: sliderColor,
              "&:hover": {cursor: 'default'},
            }}
          />
          <Typography fontWeight="bold" color="white">
            {Math.round((fundraising.currentAmount / fundraising.targetAmount) * 100)}%
          </Typography>
        </Box>
        <Divider color={"#25324a"} sx={{marginBottom: '10px'}}/>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          {
            isVenuePanel &&
            fundraising.status === FundraisingStatusEnum.ACTIVE &&
            fundraising.venuePromotion === ("NONE" as PromotionTypeKey) &&
            (
              <Button
                onClick={() => {
                  setSelectedFundraising(fundraising);
                  setIsPromotionDialogOpen?.(true);
                }}
                sx={{fontSize: "10px !important"}}
                startIcon={<LocalActivityIcon/>}
              >
                Aggiungi promozione
              </Button>
            )
          }
          {
            !isVenuePanel &&
            getActionsFromStatus(
              fundraising,
              setIsEditDialogOpen!,
              setIsContributionDialogOpen!,
              setSelectedFundraising,
              isInPersonalPanel
            )
          }
        </Box>
      </Box>
    </Card>
  )
}