export const FundraisingStatusEnum = {
    ACTIVE: 'ACTIVE',
    ACHIEVED: 'ACHIEVED',
    NOT_ACHIEVED: 'NOT_ACHIEVED',
    CANCELLED: 'CANCELLED'
} as const;

export type FundraisingStatusKey = keyof typeof FundraisingStatusEnum;