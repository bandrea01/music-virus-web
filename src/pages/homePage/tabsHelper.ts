import type {SvgIconComponent} from "@mui/icons-material";
import HeadsetIcon from '@mui/icons-material/Headset';
import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import FlagCircleOutlinedIcon from '@mui/icons-material/FlagCircleOutlined';

export interface Tab {
    key: string;
    label: string;
    icon?: SvgIconComponent;
}

export const tabs: Tab[] = [
    //ADMIN
    {key: 'admin-general-dashboard', label: 'Dashboard', icon: GridViewIcon},
    {key: 'admin-artist-management', label: 'Gestione Artisti', icon: HeadsetIcon},
    {key: 'admin-fan-management', label: 'Gestione Fans', icon: PeopleIcon},
    {key: 'admin-venue-management', label: 'Gestione Esercenti', icon: StoreMallDirectoryOutlinedIcon},
    {key: 'admin-payments-management', label: 'Gestione Pagamenti', icon: CurrencyExchangeIcon},
    {key: 'admin-report-management', label: 'Segnalazioni', icon: FlagCircleOutlinedIcon},
]

const ALLOWED_BY_ROLE: Record<Exclude<string, undefined>, Tab['key'][]> = {
    ADMIN: ['admin-artist-management', 'admin-fan-management', 'admin-venue-management', 'admin-payments-management', 'admin-report-management', 'admin-general-dashboard'],
    ARTIST: ['general'],
    VENUE: ['general'],
    FAN: ['general'],
};

export const getTabsByRole = (role: string | undefined): Tab[] => {
    if (!role) return [];
    const allowedKeys = ALLOWED_BY_ROLE[role] ?? [];
    return tabs.filter(t => allowedKeys.includes(t.key));
};
