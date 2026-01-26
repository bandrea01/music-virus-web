import {
  type Event,
  type EventListResponseDTO,
  type EventVenueCounter,
  type EventVenueCounterResponseDTO,
  type Feedback,
  type FeedbackListResponseDTO,
  type FeedbackRequestDTO,
  getEventFeedbacks,
  getEvents,
  getEventVenueCounter,
  sendFeedback
} from "@pages";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";
import {useQueryClient} from "@tanstack/react-query";

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

export function useGetFeedbacks(eventId: string) {
  return useHookQuery<FeedbackListResponseDTO, Feedback[]>({
    queryKey: [eventId, "feedback"],
    queryFn: () => getEventFeedbacks(eventId),
    select: (res) => res.feedbacks ?? [],
    errorMessage: "Errore durante la richiesta del conteggio degli eventi per location!",
  });
}

export function useSendFeedback(eventId: string) {
  const queryClient = useQueryClient();
  return useHookMutation<FeedbackRequestDTO>({
    mutationFn: (payload) => sendFeedback(eventId, payload),
    errorMessage: "Errore durante l'invio del feedback sull'evento!",
    successMessage: "Feedback inviato con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [eventId, 'feedback']}).then(() => {
      });
    }
  })
}