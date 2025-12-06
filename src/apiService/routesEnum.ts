export const RoutesEnum = {
    AUTH: '/auth/login',
    FAN_REGISTER: '/register/fan',
    ARTIST_REGISTER: '/register/artist',
    VENUE_REGISTER: '/register/venue',
    PROFILE: '/users/profile',
    ARTIST_LIST: '/users/artists',
    FAN_LIST: '/users/fans',
    FUNDRAISING: '/fundraising',
    EDIT_FUNDRAISING: '/fundraising/$1',
    DELETE_FUNDRAISING: '/fundraising/cancel/$1',

    //ADMIN
    VENUE_LIST: '/users/venues',
    ADMIN_VENUES: '/admin/venues',
    ADMIN_ARTISTS: '/admin/artists',
    APPROVE_ARTIST: '/admin/artist/approve',
    UNAPPROVE_ARTIST: '/admin/artist/unapprove',
    BAN_USER: '/admin/disable',
    ADMIN_STATS: '/admin/stats',
    UNBAN_USER: '/admin/enable',

    //ARTIST
    ARTIST_FUNDRAISING: '/fundraising?artistId=$1',
}