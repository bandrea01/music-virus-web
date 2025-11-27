import {Box, Icon, Typography} from "@mui/material";
import React from "react";
import type {SvgIconComponent} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {MusicVirusRoutesEnum} from "@/utils";
import {useDispatch} from "react-redux";
import {setActiveTab} from "@store/sidebar/slice.ts";

type UserCounterCardComponentProps = {
    text: string,
    number: number,
    icon: SvgIconComponent;
    redirectRoute?: string;
};


export const UserCounterCardComponent: React.FC<UserCounterCardComponentProps> = ({
                                                                                      text,
                                                                                      number,
                                                                                      icon,
                                                                                      redirectRoute
                                                                                  }: UserCounterCardComponentProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCardClick = () => {
        if (redirectRoute) {
            navigate(`${MusicVirusRoutesEnum.MUSIC_VIRUS}/${redirectRoute}`);
            dispatch(setActiveTab(redirectRoute));
        }
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            gap={1}
            borderRadius={2}
            width={"150px"}
            padding={2}
            sx={{
                backgroundColor: 'transparent',
                ":hover": {
                    cursor: 'pointer',
                    backgroundColor: '#04243e',
                },
            }}
            onClick={handleCardClick}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <Icon component={icon} sx={{fontSize: 50, color: "#fafafa"}}/>
                <Typography color="white" fontWeight="bold">
                    {text}
                </Typography>
            </Box>
            <Box>
                <Typography color={"#de80ff"} fontWeight="bold" fontSize="30px">
                    {number}
                </Typography>
            </Box>
        </Box>
    );

}