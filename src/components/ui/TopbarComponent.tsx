import {Box, IconButton, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useNavigate} from "react-router-dom";
import type {ReactElement} from "react";
import {AppRoutes} from "@utils";
import {useAuth} from "@components";

export default function TopbarComponent (): ReactElement {

    const {profileUser, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <Box className="home__header">
            <Box className="home__header-left">
                <img src="/complete_logo.png" alt="Music Virus" draggable={false}/>
            </Box>
            <Box className="home__header-right" gap={2}>
                <Box display="flex" alignItems="center">
                    <IconButton
                        component="a"
                        href={AppRoutes.SECTION.PROFILE}
                        sx={{
                            color: "white",
                            '&:hover': {color: '#ac60ff'},
                        }}
                    >
                        <AccountCircleIcon fontSize="large"/>
                    </IconButton>
                    <Typography variant="body2" className="home__role">
                        <strong>{profileUser?.name} {profileUser?.surname}</strong>
                    </Typography>
                </Box>
                <Box>
                    <ExitToAppIcon
                        sx={{cursor: 'pointer', marginTop: '3px'}}
                        onClick={() => {
                            logout();
                            navigate(AppRoutes.LOGIN)
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

