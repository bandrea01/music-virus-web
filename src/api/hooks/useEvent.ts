import {
    type Event,
    type EventListResponseDTO,
    type EventVenueCounter,
    type EventVenueCounterResponseDTO,
    getEvents, getEventVenueCounter
} from "@pages";
import {useHookQuery} from "@api/hooks/hooksQuery.ts";

export function useGetEvents() {
    return useHookQuery<EventListResponseDTO, Event[]>({
        queryKey: ["event"],
        queryFn: getEvents,
        select: (res) => res.events ?? [],
        errorMessage: "Errore durante la richiesta della lista degli eventi!",
    });
}

export function useGetEventVenueCounter() {
    return useHookQuery<EventVenueCounterResponseDTO, EventVenueCounter[]>({
        queryKey: ["event-venue-counter"],
        queryFn: getEventVenueCounter,
        select: (res) => res.eventVenueCounters ?? [],
        errorMessage: "Errore durante la richiesta del conteggio degli eventi per location!",
    });
}