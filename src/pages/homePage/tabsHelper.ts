import type {SvgIconComponent} from "@mui/icons-material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HeadsetIcon from '@mui/icons-material/Headset';
import PeopleIcon from '@mui/icons-material/People';

export interface Tab {
    key: string;
    label: string;
    icon?: SvgIconComponent;
}

export const tabs: Tab[] = [
    { key: 'general', label: 'Dashboard', icon: RecordVoiceOverIcon},
    { key: 'admin-artist-management',  label: 'Gestione artisti', icon: HeadsetIcon},
    { key: 'admin-fan-management',  label: 'Gestione Fans', icon: PeopleIcon},

]

const ALLOWED_BY_ROLE: Record<Exclude<string, undefined>, Tab['key'][]> = {
    ADMIN: ['admin-artist-management', 'admin-fan-management'],
    ARTIST: ['general'],
    VENUE: ['general'],
    FAN: ['general'],
};

export const getTabsByRole = (role: string | undefined): Tab[] => {
    if (!role) return [];
    const allowedKeys = ALLOWED_BY_ROLE[role] ?? [];
    return tabs.filter(t => allowedKeys.includes(t.key));
};
