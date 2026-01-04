export const UserAuthRoleEnum = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_FAN: 'ROLE_FAN',
    ROLE_ARTIST: 'ROLE_ARTIST',
    ROLE_VENUE: 'ROLE_VENUE',
} as const;
export type UserAuthRoleKey = keyof typeof UserAuthRoleEnum;

export const UserTypeEnum = {
    FAN: "FAN",
    ARTIST: "ARTIST",
    VENUE: "VENUE",
} as const;
export type UserTypeKey = keyof typeof UserTypeEnum;