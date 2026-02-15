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
  getEventVenueCounter, getTopContributors,
  sendFeedback, type TopContributor, type TopContributorsListResponseDTO
} from "@pages";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";
import {useQueryClient} from "@tanstack/react-query";

export function useGetEvents() {
  return useHookQuery<EventListResponseDTO, Event[]>({
    queryKey: ["event"],
    queryFn: getEvents,
    select: (res) => res.events ?? [],
  });
}

export function useGetEventVenueCounter() {
  return useHookQuery<EventVenueCounterResponseDTO, EventVenueCounter[]>({
    queryKey: ["event-venue-counter"],
    queryFn: getEventVenueCounter,
    select: (res) => res.eventVenueCounters ?? [],
  });
}

export function useGetTopContributors(fundraisingId: string) {
  return useHookQuery<TopContributorsListResponseDTO, TopContributor[]>({
    queryKey: [fundraisingId, "top-contributors"],
    queryFn: () => getTopContributors(fundraisingId),
    select: (res) => res.topContributors ?? [],
  });
}

export function useGetFeedbacks(eventId: string) {
  return useHookQuery<FeedbackListResponseDTO, Feedback[]>({
    queryKey: [eventId, "feedback"],
    queryFn: () => getEventFeedbacks(eventId),
    select: (res) => res.feedbacks ?? [],
  });
}

export function useSendFeedback(eventId: string) {
  const queryClient = useQueryClient();
  return useHookMutation<FeedbackRequestDTO>({
    mutationFn: (payload) => sendFeedback(eventId, payload),
    successMessage: "Feedback inviato con successo!",
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [eventId, 'feedback']}).then(() => {
      });
    }
  })
}