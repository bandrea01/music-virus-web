import {ApiRoutes, eventFundraisingApi} from "@api";
import type {EventListResponseDTO, EventVenueCounterResponseDTO} from "@pages";

export async function getEvents(): Promise<EventListResponseDTO> {
    const { data } = await eventFundraisingApi.get<EventListResponseDTO>(ApiRoutes.EVENT.ROOT);
    return data;
}

export async function getEventVenueCounter(): Promise<EventVenueCounterResponseDTO> {
    const { data } = await eventFundraisingApi.get<EventVenueCounterResponseDTO>(ApiRoutes.EVENT.EVENT_COUNTER);
    return data;
}
