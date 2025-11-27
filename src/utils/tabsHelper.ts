import type { SvgIconComponent } from "@mui/icons-material";
import HeadsetIcon from "@mui/icons-material/Headset";
import PeopleIcon from "@mui/icons-material/People";
import GridViewIcon from "@mui/icons-material/GridView";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import {MusicVirusRoutesEnum, type MusicVirusRouteValue} from "@/utils";
import type {AuthRole} from "@/components";

export interface Tab {
    key: string;
    label: string;
    icon?: SvgIconComponent;
    route: MusicVirusRouteValue;
}

const tabs: Tab[] = [
    // ADMIN
    {
        key: "admin-general-dashboard",
        label: "Dashboard",
        icon: GridViewIcon,
        route: MusicVirusRoutesEnum.ADMIN_GENERAL_DASHBOARD,
    },
    {
        key: "admin-artist-management",
        label: "Gestione Artisti",
        icon: HeadsetIcon,
        route: MusicVirusRoutesEnum.ADMIN_ARTIST_MANAGEMENT,
    },
    {
        key: "admin-fan-management",
        label: "Gestione Fans",
        icon: PeopleIcon,
        route: MusicVirusRoutesEnum.ADMIN_FAN_MANAGEMENT,
    },
    {
        key: "admin-venue-management",
        label: "Gestione Esercenti",
        icon: StoreMallDirectoryOutlinedIcon,
        route: MusicVirusRoutesEnum.ADMIN_VENUE_MANAGEMENT,
    },
    {
        key: "admin-payments-management",
        label: "Gestione Pagamenti",
        icon: CurrencyExchangeIcon,
        route: MusicVirusRoutesEnum.ADMIN_PAYMENTS_MANAGEMENT,
    },
    {
        key: "admin-report-management",
        label: "Segnalazioni",
        icon: FlagCircleOutlinedIcon,
        route: MusicVirusRoutesEnum.ADMIN_REPORT_MANAGEMENT,
    },

    // // ARTIST
    // {
    //     key: "artist-home",
    //     label: "Home",
    //     icon: HeadsetIcon,
    //     route: MusicVirusRoutesEnum.ARTIST_HOME,
    // },
    //
    // // VENUE
    // {
    //     key: "venue-home",
    //     label: "Home",
    //     icon: StoreMallDirectoryOutlinedIcon,
    //     route: MusicVirusRoutesEnum.VENUE_HOME,
    // },
    //
    // // FAN
    // {
    //     key: "fan-home",
    //     label: "Home",
    //     icon: PeopleIcon,
    //     route: MusicVirusRoutesEnum.FAN_HOME,
    // },
];

const allowedByRoleTab: Record<AuthRole, Tab["key"][]> = {
    ROLE_ADMIN: [
        MusicVirusRoutesEnum.ADMIN_GENERAL_DASHBOARD,
        MusicVirusRoutesEnum.ADMIN_ARTIST_MANAGEMENT,
        MusicVirusRoutesEnum.ADMIN_FAN_MANAGEMENT,
        MusicVirusRoutesEnum.ADMIN_VENUE_MANAGEMENT,
        MusicVirusRoutesEnum.ADMIN_PAYMENTS_MANAGEMENT,
        MusicVirusRoutesEnum.ADMIN_REPORT_MANAGEMENT,
    ],
    ROLE_ARTIST: [],
    ROLE_VENUE: [],
    ROLE_FAN: [],
};

export const getTabsByRole = (role: AuthRole | undefined): Tab[] => {
    if (!role) return [];

    const allowedKeys = allowedByRoleTab[role] ?? [];
    return tabs.filter((t) => allowedKeys.includes(t.key));
};
