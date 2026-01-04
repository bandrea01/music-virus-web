import type {SvgIconComponent} from "@mui/icons-material";
import HeadsetIcon from "@mui/icons-material/Headset";
import PeopleIcon from "@mui/icons-material/People";
import GridViewIcon from "@mui/icons-material/GridView";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FestivalIcon from '@mui/icons-material/Festival';
import {AppRoutes, type AppRouteValue, type UserAuthRoleKey} from "@utils";
import SavingsIcon from "@mui/icons-material/Savings";

export interface Tab {
    key: string;
    label: string;
    icon?: SvgIconComponent;
    route: AppRouteValue;
}

const tabs: Tab[] = [
    // COMMON
    {
        key: "fundraising",
        label: "Raccolte Fondi",
        icon: MonetizationOnIcon,
        route: AppRoutes.SECTION.FUNDRAISING,
    },
    {
        key: "event",
        label: "Eventi",
        icon: FestivalIcon,
        route: AppRoutes.SECTION.EVENT,
    },

    // ADMIN
    {
        key: "admin-general-dashboard",
        label: "Dashboard",
        icon: GridViewIcon,
        route: AppRoutes.ADMIN.GENERAL_DASHBOARD,
    },
    {
        key: "admin-artist-management",
        label: "Gestione Artisti",
        icon: HeadsetIcon,
        route: AppRoutes.ADMIN.ARTIST_MANAGEMENT,
    },
    {
        key: "admin-fan-management",
        label: "Gestione Fans",
        icon: PeopleIcon,
        route: AppRoutes.ADMIN.FAN_MANAGEMENT,
    },
    {
        key: "admin-venue-management",
        label: "Gestione Esercenti",
        icon: StoreMallDirectoryOutlinedIcon,
        route: AppRoutes.ADMIN.VENUE_MANAGEMENT,
    },
    {
        key: "admin-payments-management",
        label: "Gestione Pagamenti",
        icon: CurrencyExchangeIcon,
        route: AppRoutes.ADMIN.PAYMENTS_MANAGEMENT,
    },
    {
        key: "admin-report-management",
        label: "Segnalazioni",
        icon: FlagCircleOutlinedIcon,
        route: AppRoutes.ADMIN.REPORT_MANAGEMENT,
    },

    // ARTIST
    {
        key: "artist-personal-fundraising",
        label: "Tue Raccolte Fondi",
        icon: SavingsIcon,
        route: AppRoutes.ARTIST.PERSONAL_FUNDRAISING,
    },
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

const commonTabKeys: Tab["key"][] = [
    "event",
    "fundraising"
];

const allowedByRoleTab: Record<UserAuthRoleKey, Tab["key"][]> = {
    ROLE_ADMIN: [
        "admin-general-dashboard",
        "admin-artist-management",
        "admin-fan-management",
        "admin-venue-management",
        "admin-payments-management",
        "admin-report-management",
    ],
    ROLE_ARTIST: [
        "artist-personal-fundraising"
    ],
    ROLE_VENUE: [],
    ROLE_FAN: [],
};

export const getTabsByRole = (role: UserAuthRoleKey | undefined): Tab[] => {
    if (!role) return [];

    const allowedKeys: Tab["key"][] = [
        ...allowedByRoleTab[role],
        ...commonTabKeys,
    ];

    const uniqueAllowedKeys = Array.from(new Set(allowedKeys));
    return uniqueAllowedKeys
        .map((key) => tabs.find((t) => t.key === key))
        .filter((t): t is Tab => t !== undefined);
};
