export const ApiRoutes = {
    ROOT: "/",
    LOGIN: "/auth/login",
    PRE_REGISTER: "/pre-register",

    REGISTER: {
        byType: (type: string) => `/register/${type}`, // route builder for register
    },

    MUSIC_VIRUS: "/music-virus",

    // Fundraising
    FUNDRAISING: {
        ROOT: "/fundraising",
        ME: "/fundraising/me",
        CANCEL: (id: string) => `/fundraising/cancel/${id}`,
        EDIT: (id: string) => `/fundraising/${id}`,
        CONFIRM: (id: string) => `/fundraising/confirm/${id}`,
        ADD_PROMOTION: (id: string) => `/fundraising/${id}/promotion`,
    },

    // Event
    EVENT: {
        ROOT: "/event",
        EVENT_COUNTER: "/event/venues/count",
        FEEDBACK: (eventId: string) => `/event/${eventId}/feedbacks`,
    },

    // Admin
    ADMIN: {
        STATS: "/admin/stats",
        VENUES: "/admin/venues",
        ARTISTS: "/admin/artists",
        FANS: "/admin/fans",
        APPROVE_ARTIST: (artistId: string) => `/admin/artist/${artistId}/approve`,
        UNAPPROVE_ARTIST: (artistId: string) => `/admin/artist/${artistId}/unapprove`,
        BAN_USER: (userId: string) => `/admin/disable/${userId}`,
        UNBAN_USER: (userId: string) => `/admin/enable/${userId}`,
        SUBSCRIPTIONS: {
            ROOT: '/admin/subscriptions',
            EDIT: (feePlanId: string) => `/admin/subscriptions/${feePlanId}`,
        },
        TAXES: {
            ROOT: '/admin/taxes',
            EDIT: (taxId: string) => `/admin/taxes/${taxId}`,
        }
    },

    // Profile
    PROFILE: {
        ROOT: "/profile",
        FANS: "/profile/fans",
        ARTISTS: "/profile/artists",
        VENUES: "/profile/venues",
        ACCOUNT: "/account",
    },

    FEE: {
        ROOT: '/fee',
        SUBSCRIPTIONS: {
            ROOT: '/fee/subscriptions',
            ARTISTS: '/fee/subscriptions/artists',
            VENUES: '/fee/subscriptions/venues',
            FANS: '/fee/subscriptions/fans',
        },
        TAXES: {
            ROOT: '/fee/taxes',
        }
    },

    BILLING: {
        ROOT: '/',
        DEPOSIT: '/account/deposit',
        TRANSACTIONS: '/account/transactions',
        CONTRIBUTION: '/contribution',
        TOP_CONTRIBUTORS: (fundraisingId: string) => `/contribution/${fundraisingId}/top-contributors`,
        TICKETS: '/tickets',
        TICKET: (ticketId: string) => `/tickets/${ticketId}`,
    }
} as const;
