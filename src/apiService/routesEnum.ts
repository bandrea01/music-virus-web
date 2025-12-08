export const RoutesEnum = {
    // USER IDENTITY
    AUTH: '/auth/login',

    FAN_REGISTER: '/register/fan',
    ARTIST_REGISTER: '/register/artist',
    VENUE_REGISTER: '/register/venue',

    PERSONAL_PROFILE: '/profile',
    FAN_LIST: '/profile/fans',
    ARTIST_LIST: '/profile/artists',
    VENUE_LIST: '/profile/venues',

    //ADMIN
    ADMIN_VENUES: '/admin/venues',
    ADMIN_ARTISTS: '/admin/artists',
    ADMIN_FANS: '/admin/fans',
    APPROVE_ARTIST: '/admin/artist/approve/$1',
    UNAPPROVE_ARTIST: '/admin/artist/unapprove/$1',
    ADMIN_STATS: '/admin/stats',
    BAN_USER: '/admin/disable/$1',
    UNBAN_USER: '/admin/enable/$1',

    // EVENTS & FUNDRAISING
    FUNDRAISING: '/fundraising',
    ARTIST_FUNDRAISING: '/fundraising?artistId=$1',
    DELETE_FUNDRAISING: '/fundraising/cancel/$1',
    EDIT_FUNDRAISING: '/fundraising/$1',
}