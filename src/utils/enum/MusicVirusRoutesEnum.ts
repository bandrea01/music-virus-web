export const MusicVirusRoutesEnum = {
    ROOT: "/",
    LOGIN: "/login",
    PRE_REGISTER: "/pre-register",
    REGISTER_TYPE: "/register/:type",

    MUSIC_VIRUS: "/music-virus",
    HOMEPAGE: "/homepage",

    ADMIN_GENERAL_DASHBOARD: "admin-general-dashboard",
    ADMIN_ARTIST_MANAGEMENT: "admin-artist-management",
    ADMIN_FAN_MANAGEMENT: "admin-fan-management",
    ADMIN_VENUE_MANAGEMENT: "admin-venue-management",
    ADMIN_PAYMENTS_MANAGEMENT: "admin-payments-management",
    ADMIN_REPORT_MANAGEMENT: "admin-report-management",
    PROFILE: "profile",
} as const;

export type MusicVirusRouteValue =
    (typeof MusicVirusRoutesEnum)[keyof typeof MusicVirusRoutesEnum];
