import type {ComponentType} from "react";
import type {SvgIconComponent} from "@mui/icons-material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AdminArtistPanel from "./panel/admin/AdminArtistPanel.tsx";
import AdminGeneralPanel from "./panel/admin/AdminGeneralPanel.tsx";

export interface Tab {
    key: string;
    label: string;
    panel: ComponentType;
    icon?: SvgIconComponent;
}

export const tabs: Tab[] = [
    // ADMIN
    { key: 'general', label: 'Dashboard', icon: RecordVoiceOverIcon, panel: AdminGeneralPanel },
    { key: 'artist',  label: 'Artisti',   icon: RecordVoiceOverIcon, panel: AdminArtistPanel },

    // {id: 'dashboard', label: 'Dashboard', panel: 'DashboardPanel'},
    // {id: 'campaigns', label: 'Le Mie Campagne', panel: 'EventsPanel'},
    // {id: 'feedback', label: 'Feedback', panel: 'FeedbackPanel'},
    // {id: 'profile', label: 'Profilo', panel: 'ProfilePanel'},

    // {id: 'dashboard', label: 'Dashboard', panel: 'DashboardPanel'},
    // {id: 'campaigns', label: 'Le Mie Campagne', panel: 'EventsPanel'},
    // {id: 'feedback', label: 'Feedback', panel: 'FeedbackPanel'},
    // {id: 'profile', label: 'Profilo', panel: 'ProfilePanel'},

    // {id: 'dashboard', label: 'Dashboard', panel: 'DashboardPanel'},
    // {id: 'campaigns', label: 'Le Mie Campagne', panel: 'EventsPanel'},
    // {id: 'feedback', label: 'Feedback', panel: 'FeedbackPanel'},
    // {id: 'profile', label: 'Profilo', panel: 'ProfilePanel'},
]

const ALLOWED_BY_ROLE: Record<Exclude<string, undefined>, Tab['key'][]> = {
    ADMIN: ['general', 'artist'],
    ARTIST: ['general'],
    VENUE: ['general'],
    FAN: ['general'],
};

export const getTabsByRole = (role: string | undefined): Tab[] => {
    if (!role) return [];
    const allowedKeys = ALLOWED_BY_ROLE[role] ?? [];
    return tabs.filter(t => allowedKeys.includes(t.key));
};
