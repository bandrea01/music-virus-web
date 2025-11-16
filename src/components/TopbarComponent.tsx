import {Box, IconButton, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {type IUserProfile, useAuth} from "./context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

type TopbarComponentProps = {
    profileUser: IUserProfile | null;
}

const TopbarComponent = (
    {profileUser}: TopbarComponentProps
) => {

    const {logout} = useAuth();
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
                        href="/profile"
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
                            navigate('/login')
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default TopbarComponent;