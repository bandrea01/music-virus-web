import {type ReactElement} from "react";
import {type EnrichEvent} from "@pages";
import {formatDateWithTime} from "@utils";
import {Avatar, Box, Button, Card, Divider, Tooltip, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';

type EventCardComponentProps = {
    event: EnrichEvent;
    // setSelectedFundraising: (fundraising: Fundraising | undefined) => void;
    // setIsEditDialogOpen: (open: boolean) => void;
}
// type Palette = {
//     backgroundColor: string;
//     statusColor: string;
//     sliderColor: string;
// }

// const STATUS_PALETTE: Record<FundraisingStatusKey, Omit<Palette, 'sliderColor'>> = {
//     [FundraisingStatusEnum.ACTIVE]: {
//         backgroundColor: '#0F172A',
//         statusColor: '#E5E7EB',
//     },
//     [FundraisingStatusEnum.ACHIEVED]: {
//         backgroundColor: '#201735',
//         statusColor: '#E3B7FF',
//     },
//     [FundraisingStatusEnum.CANCELLED]: {
//         backgroundColor: '#1F2933',
//         statusColor: '#9CA3AF',
//     },
//     [FundraisingStatusEnum.NOT_ACHIEVED]: {
//         backgroundColor: 'rgba(59,47,26,0.73)',
//         statusColor: '#FACC15',
//     },
//     [FundraisingStatusEnum.CONFIRMED]: {
//         backgroundColor: '#103827',
//         statusColor: '#BBF7D0',
//     },
// };
//
// function getSliderColor(status: FundraisingStatusKey, percentage: number): string {
//     if (status === FundraisingStatusEnum.CANCELLED) {
//         return 'rgb(107, 114, 128)';
//     }
//     const value = Math.max(0, Math.min(100, percentage));
//
//     if (value === 0) {
//         return 'rgb(220, 38, 38)';
//     }
//     if (value > 0 && value < 50) {
//         return 'rgb(234, 88, 12)';
//     }
//     if (value >= 50 && value < 100) {
//         return 'rgb(250, 204, 21)';
//     }
//     return 'rgb(34, 197, 94)';
// }

// function getPalette(status: FundraisingStatusKey, percentage: number): Palette {
//     const sliderColor = getSliderColor(status, percentage);
//     const statusPalette = STATUS_PALETTE[status] ?? {
//         backgroundColor: '',
//         statusColor: '',
//     };
//
//     return {
//         ...statusPalette,
//         sliderColor,
//     };
// }


export default function EventCardComponent({
                                               event,
                                           }: EventCardComponentProps): ReactElement {

    const actions = [
        {
            label: 'Donazioni',
            startIcon: <></>,
            onClick: () => {
                // setSelectedFundraising(fundraising);
                // setIsEditDialogOpen(true);
            },
        },
    ];

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: `transparent`,
                borderWidth: "3px !important",
                padding: "20px",
                borderRadius: "15px",
                opacity: "100%",
                minHeight: "200px",
                minWidth: "150px",
                "&:hover": {cursorPointer: "pointer"}
            }}
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={2}>
                <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
                    <Box>
                        <Tooltip title={event.artistName} arrow>
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '10px',
                                    backgroundColor: '#335998',
                                }}
                                variant="circular"
                            >
                                {event.artistName.split(' ')[0].charAt(0)}{event.artistName.split(' ')[1].charAt(0)}
                            </Avatar>
                        </Tooltip>
                    </Box>
                    <Box display="flex" flexDirection="column" overflow="hidden">
                        <Box display="flex" justifyContent="space-between" gap={0.5}>
                            <Typography fontSize="18px" color="white" fontWeight="bold"
                                        sx={{textDecoration: 'underline'}}>
                                {event.eventName}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon sx={{color: 'white'}}/>
                        <Typography fontWeight="bold" color="white" fontSize="13px">
                            {formatDateWithTime(event.eventDate)}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationPinIcon sx={{color: 'white'}}/>
                        <Typography fontWeight="bold" color="white" fontSize="13px">
                            {event.venueName}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" width="100%" gap={1}>
                </Box>
                <Divider color={"#25324a"} sx={{marginBottom: '10px'}}/>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                    {actions.map((action) => {
                        return (
                            <Button
                                key={action.label}
                                startIcon={action.startIcon}
                                onClick={action.onClick}
                                sx={{fontSize: "10px !important"}}
                            >
                                {action.label}
                            </Button>
                        );
                    })}
                </Box>
            </Box>
        </Card>
    )
}