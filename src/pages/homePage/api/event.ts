import {ApiRoutes, eventFundraisingApi} from "@api";
import type {
    EventListResponseDTO,
    EventVenueCounterResponseDTO,
    FeedbackListResponseDTO,
    FeedbackRequestDTO
} from "@pages";

export async function getEvents(): Promise<EventListResponseDTO> {
    const { data } = await eventFundraisingApi.get<EventListResponseDTO>(ApiRoutes.EVENT.ROOT);
    return data;
}

export async function getEventVenueCounter(): Promise<EventVenueCounterResponseDTO> {
    const { data } = await eventFundraisingApi.get<EventVenueCounterResponseDTO>(ApiRoutes.EVENT.EVENT_COUNTER);
    return data;
}

export async function getEventFeedbacks(eventId: string): Promise<FeedbackListResponseDTO> {
    const { data } = await eventFundraisingApi.get<FeedbackListResponseDTO>(`${ApiRoutes.EVENT.FEEDBACK(eventId)}`);
    return data;
}

export async function sendFeedback(eventId: string, payload: FeedbackRequestDTO){
    const { data } = await eventFundraisingApi.post(`${ApiRoutes.EVENT.FEEDBACK(eventId)}`, payload);
    return data;
}
