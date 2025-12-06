export const MusicVirusRoutesEnum = {
    //public
    ROOT: "/",
    LOGIN: "/login",
    PRE_REGISTER: "/pre-register",
    REGISTER_TYPE: "/register/:type",

    //base protected root
    MUSIC_VIRUS: "/music-virus",

    //common
    PROFILE: "profile",
    FUNDRAISING: "fundraising",
    EVENT: "event",

    //admin
    ADMIN_GENERAL_DASHBOARD: "admin-general-dashboard",
    ADMIN_ARTIST_MANAGEMENT: "admin-artist-management",
    ADMIN_FAN_MANAGEMENT: "admin-fan-management",
    ADMIN_VENUE_MANAGEMENT: "admin-venue-management",
    ADMIN_PAYMENTS_MANAGEMENT: "admin-payments-management",
    ADMIN_REPORT_MANAGEMENT: "admin-report-management",

    //artist
    ARTIST_PERSONAL_FUNDRAISING: "artist-personal-fundraising",
} as const;

export type MusicVirusRouteValue =
    (typeof MusicVirusRoutesEnum)[keyof typeof MusicVirusRoutesEnum];
