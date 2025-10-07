import React, { useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

export type Role = "fan" | "artist" | "venue" | "admin";

function useCurrentUserRole(): Role {
    const stored = typeof window !== "undefined" ? localStorage.getItem("app:role") : null;
    return (stored as Role) || "fan";
}

const DashboardTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h5" gutterBottom>Benvenuto 👋</Typography>
            <Typography variant="body1">Qui vedrai un riepilogo rapido di notifiche, attività recenti e statistiche.</Typography>
        </CardContent>
    </Card>
);

const ExploreTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Esplora</Typography>
            <Typography variant="body2">Ricerca artisti, venue, eventi e progetti da supportare.</Typography>
        </CardContent>
    </Card>
);

const MyGigsTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>I miei eventi</Typography>
            <Typography variant="body2">Gestisci line-up, disponibilità, calendario e richieste.</Typography>
        </CardContent>
    </Card>
);

const MyReleasesTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Le mie uscite</Typography>
            <Typography variant="body2">Carica brani/EP, collega i social e monitora le performance.</Typography>
        </CardContent>
    </Card>
);

const VenuesTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Venue</Typography>
            <Typography variant="body2">Gestisci la tua venue, eventi e richieste di booking.</Typography>
        </CardContent>
    </Card>
);

const SettingsTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Impostazioni</Typography>
            <Typography variant="body2">Profilo, sicurezza, preferenze notifiche.</Typography>
            <Divider sx={{ my: 2 }} />
            <Button className="btn btn--primary" sx={{ color: "#fff" }}>Salva</Button>
        </CardContent>
    </Card>
);

const AdminTab = () => (
    <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" gutterBottom>Amministrazione</Typography>
            <Typography variant="body2">Gestione utenti, approvazioni contenuti, reportistica.</Typography>
        </CardContent>
    </Card>
);

export type TabKey = "dashboard" | "explore" | "my-gigs" | "my-releases" | "venues" | "settings" | "admin";
export type TabItem = { key: TabKey; label: string; icon: React.ReactNode; component: React.ReactNode; };

const BASE_TABS: TabItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardCustomizeRoundedIcon />, component: <DashboardTab /> },
    { key: "explore", label: "Esplora", icon: <SearchRoundedIcon />, component: <ExploreTab /> },
    { key: "settings", label: "Impostazioni", icon: <SettingsRoundedIcon />, component: <SettingsTab /> }
];

function getTabsForRole(role: Role): TabItem[] {
    switch (role) {
        case "artist":
            return [
                ...BASE_TABS,
                { key: "my-gigs", label: "I miei eventi", icon: <EventSeatRoundedIcon />, component: <MyGigsTab /> },
                { key: "my-releases", label: "Le mie uscite", icon: <AlbumRoundedIcon />, component: <MyReleasesTab /> }
            ];
        case "venue":
            return [
                ...BASE_TABS,
                { key: "venues", label: "La mia venue", icon: <MusicNoteRoundedIcon />, component: <VenuesTab /> }
            ];
        case "admin":
            return [
                ...BASE_TABS,
                { key: "admin", label: "Admin", icon: <LockRoundedIcon />, component: <AdminTab /> }
            ];
        case "fan":
        default:
            return BASE_TABS;
    }
}

export default function HomePage() {
    const role = useCurrentUserRole();
    const allTabs = useMemo(() => getTabsForRole(role), [role]);
    const [activeKey, setActiveKey] = useState<TabKey>(allTabs[0]?.key || "dashboard");
    const isDownMd = useMediaQuery("(max-width: 900px)");
    const [sidebarOpen, setSidebarOpen] = useState(!isDownMd);
    const activeTab = allTabs.find(t => t.key === activeKey) || allTabs[0];

    return (
        <Box className="home" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Box className="home__header" sx={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, px: 2, borderBottom: "1px solid rgba(0,0,0,0.08)", backdropFilter: "saturate(180%) blur(8px)", backgroundColor: "rgba(255,255,255,0.7)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton onClick={() => setSidebarOpen(s => !s)} aria-label="toggle sidebar" sx={{ mr: 1, display: { md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box component="img" src="/complete_logo.png" alt="logo" sx={{ height: 28, objectFit: "contain" }} />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>Ruolo:</Typography>
                    <Typography variant="body2" fontWeight={600}>{role}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { md: "300px 1fr" }, flex: 1 }}>
                {/* SIDEBAR SINISTRA */}
                <Box component="aside" className="home__sidebar" sx={{ position: { md: "sticky" }, top: { md: 64 }, left: 0, height: { md: "calc(100vh - 64px)" }, borderRight: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#fff", display: { xs: sidebarOpen ? "block" : "none", md: "block" } }}>
                    <Box sx={{ p: 2 }}>
                        <Typography variant="overline" sx={{ opacity: 0.7 }}>Navigazione</Typography>
                    </Box>
                    <Divider />
                    <List disablePadding>
                        {allTabs.map(tab => (
                            <ListItemButton key={tab.key} selected={tab.key === activeKey} onClick={() => setActiveKey(tab.key)} sx={{ borderRadius: 0, '&.Mui-selected': { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>{tab.icon}</ListItemIcon>
                                <ListItemText primary={tab.label} />
                            </ListItemButton>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 2, display: "grid", gap: 1 }}>
                        <Button className="btn btn--primary" sx={{ color: "#fff" }} onClick={() => alert("CTA primaria")}>Azione primaria</Button>
                        <Button variant="outlined" onClick={() => alert("Secondaria")}>Azione secondaria</Button>
                    </Box>
                </Box>

                {/* MAIN CONTENT */}
                <Box component="main" sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, width: "100%" }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>{activeTab?.label}</Typography>
                    <Box>{activeTab?.component}</Box>
                </Box>
            </Box>
        </Box>
    );
}