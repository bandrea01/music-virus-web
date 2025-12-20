export const EventStatusEnum = {
    CONFIRMED: 'CONFIRMED',
    PENDING: 'PENDING',
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED'
} as const;

export type EventStatusKey = keyof typeof EventStatusEnum;