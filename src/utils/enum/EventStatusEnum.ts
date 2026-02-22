export const EventStatusEnum = {
    CONFIRMED: 'CONFIRMED',
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED'
} as const;

export type EventStatusKey = keyof typeof EventStatusEnum;