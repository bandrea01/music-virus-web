import React from "react";
import {Avatar, Box, Card, Divider, Slider, Typography} from "@mui/material";
import type {EnrichFundraising} from "@pages";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import {FundraisingStatusEnum} from "@utils";

type FundraisingCardComponentProps = {
    fundraising: EnrichFundraising;
    buttons?: React.ReactNode[];
}

function calculateColor(percentage: number): string {
    const red = Math.min(255, Math.floor((100 - percentage) * 2.55));
    const green = Math.min(255, Math.floor(percentage * 2.55));
    return `rgb(${red}, ${green}, 0)`;
}

function getBackgroundColor(status: string): string {
    switch (status) {
        case FundraisingStatusEnum.ACTIVE:
            return '#0f172a';
        case FundraisingStatusEnum.ACHIEVED:
            return '#104E269E';
        case FundraisingStatusEnum.CANCELLED:
            return '#2E2E2ED8';
        case FundraisingStatusEnum.NOT_ACHIEVED:
            return '#675C2360';
        default:
            return '';
    }
}

function getStatusColor(status: string): string {
    switch (status) {
        case FundraisingStatusEnum.ACTIVE:
            return '#3EE489';
        case FundraisingStatusEnum.ACHIEVED:
            return '#ac60ff';
        case FundraisingStatusEnum.CANCELLED:
            return '#9CA3AF';
        case FundraisingStatusEnum.NOT_ACHIEVED:
            return '#EAB308';
        default:
            return '';
    }
}

export const FundraisingCardComponent: React.FC<FundraisingCardComponentProps> = ({
                                                                                      fundraising,
                                                                                      buttons
                                                                                  }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: `${getBackgroundColor(fundraising.status)} !important`,
                borderWidth: "3px !important",
                padding: "20px",
                borderRadius: "15px",
                opacity: "100%",
                minHeight: "200px",
                minWidth: "300px",
                "&:hover": {cursorPointer: "pointer"}
            }}
        >
            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={3}>
                <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: "#ac60ff",
                            ":hover": {cursor: "pointer", backgroundColor: '#33619e'}
                        }}
                    >
                        {fundraising.artistName.split(' ')[0].charAt(0)}
                        {fundraising.artistName.split(' ')[1].charAt(0)}
                    </Avatar>
                    <Box display="flex" flexDirection="column" overflow="hidden">
                        <Box display="flex" justifyContent="space-between" gap={0.5} width="400px">
                            <Typography fontSize="20px" color="white" fontWeight="bold">
                                {fundraising.fundraisingName}
                            </Typography>
                        </Box>
                        <Typography fontSize="12px" color="#fff">
                            Somma raccolta: {fundraising.currentAmount}€ / {fundraising.targetAmount}€<br/>
                            Scadenza: {new Date(fundraising.eventDate).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box alignSelf="start">
                        <Typography fontSize="9px" color={getStatusColor(fundraising.status)}>
                            •{fundraising.status}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" width="100%" gap={1}>
                    <CalendarMonthIcon sx={{color: 'white'}}/>
                    <Typography fontWeight="bold" color="white">
                        {new Date(fundraising.eventDate).toLocaleDateString()}
                    </Typography>
                    <LocationPinIcon sx={{color: 'white', marginLeft: '20px'}}/>
                    <Typography fontWeight="bold" color="white">
                        {fundraising.venueName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" width="100%" gap={1}>
                    <Slider
                        value={(fundraising.currentAmount / fundraising.targetAmount) * 100}
                        sx={{
                            width: '100%',
                            color: calculateColor((fundraising.currentAmount / fundraising.targetAmount) * 100),
                            "&:hover": {cursor: 'default'},
                        }}
                    />
                    <Typography fontWeight="bold" color="white">
                        {Math.round((fundraising.currentAmount / fundraising.targetAmount) * 100)}%
                    </Typography>
                </Box>
                <Divider color={"#25324a"}/>
                <Box display="flex" justifyContent="space-around" gap={1}>
                    {buttons}
                </Box>
            </Box>
        </Card>
    )
}