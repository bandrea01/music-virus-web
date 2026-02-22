import type {UserTypeKey} from "@utils";

export const AppRoutes = {
    // Public
    ROOT: "/",
    LOGIN: "/login",
    PRE_REGISTER: "/pre-register",
    REGISTER: {
        TYPE: "/register/:type",
        byType: (type: UserTypeKey) => `/register/${type.toLowerCase()}`, //route builder for register
    },

    // Protected base
    MUSIC_VIRUS: "/music-virus",

    // Common Sections
    SECTION: {
        PROFILE: "profile",
        FUNDRAISING: "fundraising",
        EVENT: "event",
        TICKET: "ticket",
        TRANSACTION: "transaction",
    },

    // Admin
    ADMIN: {
        GENERAL_DASHBOARD: "admin-general-dashboard",
        ARTIST_MANAGEMENT: "admin-artist-management",
        FAN_MANAGEMENT: "admin-fan-management",
        VENUE_MANAGEMENT: "admin-venue-management",
        PAYMENTS_MANAGEMENT: "admin-payments-management",
    },

    // Artist
    ARTIST: {
        PERSONAL_FUNDRAISING: "artist-personal-fundraising",
    },

    VENUE: {
        PERSONAL_FUNDRAISING: "venue-personal-fundraising",
    }
} as const;

type DeepValues<T> =
    T extends string ? T :
        T extends Record<string, any> ? DeepValues<T[keyof T]> :
            never;

export type AppRouteValue = DeepValues<typeof AppRoutes>;
