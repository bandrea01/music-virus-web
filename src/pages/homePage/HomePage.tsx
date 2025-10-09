import React, {useMemo, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import "./homePage.scss";
import {useAuth} from "../../components/AuthContext.tsx";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type TabKey = "dashboard" | "explore" | "settings";

const DashboardTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Benvenuto!</Typography>
            <Typography variant="body2">Questa è la tua dashboard.</Typography>
        </CardContent>
    </Card>
);

const ExploreTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Esplora</Typography>
            <Typography variant="body2">
                Ricerca artisti, venue, eventi e progetti da supportare.
            </Typography>
        </CardContent>
    </Card>
);

const SettingsTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Impostazioni</Typography>
            <Typography variant="body2">Preferenze utente e configurazioni account.</Typography>
        </CardContent>
    </Card>
);

const TABS: Record<TabKey, { label: string; icon: React.ReactNode; view: React.ReactNode }> = {
    dashboard: {label: "Dashboard", icon: <DashboardCustomizeRoundedIcon/>, view: <DashboardTab/>},
    explore: {label: "Esplora", icon: <SearchRoundedIcon/>, view: <ExploreTab/>},
    settings: {label: "Impostazioni", icon: <SettingsRoundedIcon/>, view: <SettingsTab/>},
};

export default function HomePage() {
    const [active, setActive] = useState<TabKey>("dashboard");
    const {profileUser} = useAuth();

    const menu = useMemo(
        () =>
            (Object.keys(TABS) as TabKey[]).map((k) => ({
                key: k,
                label: TABS[k].label,
                icon: TABS[k].icon,
            })),
        []
    );

    return (
        <Box className="home">
            <Box className="home__header">
                <Box className="home__header-left">
                    <img src="/complete_logo.png" alt="Music Virus"/>
                </Box>
                <Box className="home__header-right">
                    <AccountCircleIcon fontSize="medium"/>
                    <Typography variant="body2" className="home__role">
                        <strong>{profileUser?.name} {profileUser?.surname}</strong>
                    </Typography>
                </Box>

            </Box>

            <Box className="home__sidebar">
                <Box>
                    <Typography variant="overline">Navigazione</Typography>
                    <List>
                        {menu.map((m) => (
                            <ListItemButton
                                key={m.key}
                                selected={active === m.key}
                                onClick={() => setActive(m.key)}
                            >
                                <ListItemIcon>{m.icon}</ListItemIcon>
                                <ListItemText primary={m.label}/>
                            </ListItemButton>
                        ))}
                    </List>
                    <Divider/>
                </Box>

                <Box>
                    <Button className="btn btn--primary" onClick={() => alert("CTA primaria")}>
                        Azione primaria
                    </Button>
                    <Button variant="outlined" onClick={() => alert("Secondaria")}>
                        Azione secondaria
                    </Button>
                </Box>
            </Box>

            <Box component="main">
                <Typography variant="h4">{TABS[active].label}</Typography>
                <Box className="home__main-content">{TABS[active].view}</Box>
            </Box>
        </Box>
    );
}
