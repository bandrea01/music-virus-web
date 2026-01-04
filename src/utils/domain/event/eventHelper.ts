import {EventStatusEnum, type EventStatusKey} from "@utils";
import type {EnrichEvent, Event} from "@pages";

export const EVENT_STATUS_ORDER: EventStatusKey[] = [
    EventStatusEnum.FINISHED,
    EventStatusEnum.CONFIRMED,
    EventStatusEnum.PENDING,
    EventStatusEnum.CANCELLED,
];

export const filterStatusLabel: Record<EventStatusKey, string> = {
    [EventStatusEnum.CONFIRMED]: "CONFERMATI",
    [EventStatusEnum.CANCELLED]: "CANCELLATI",
    [EventStatusEnum.PENDING]: "IN ATTESA",
    [EventStatusEnum.FINISHED]: "CONCLUSI",
};

export const filterStatusInitialState: Record<EventStatusKey, boolean> = {
    [EventStatusEnum.CONFIRMED]: true,
    [EventStatusEnum.CANCELLED]: true,
    [EventStatusEnum.PENDING]: true,
    [EventStatusEnum.FINISHED]: true,
}

export const filterArtistInitialState = "-";
export const filterVenueInitialState = "-";

export type StatusFilters = Record<EventStatusKey, boolean>;

type ArtistLike = {
    userId: string;
    name: string;
    surname: string;
};

type VenueLike = {
    userId: string;
    venueName: string;
};

export function buildEnrichedEvent(
    params: {
        events: Event[] | undefined;
        artists: ArtistLike[] | undefined;
        venues: VenueLike[] | undefined;
        statusFilters: Record<EventStatusKey, boolean>;
        venueFilter?: string;
        artistFilter?: string;
    }
): EnrichEvent[] | undefined {
    const {events, artists, venues, statusFilters} = params;

    const enriched: EnrichEvent[] | undefined = events?.map((event) => {
        const artist = artists?.find(a => a.userId === event.artistId);
        const venue = venues?.find(v => v.userId === event.venueId);

        return {
            ...event,
            artistName: artist ? `${artist.name} ${artist.surname}` : "",
            venueName: venue ? venue.venueName : "",
        };
    });

    let filtered = enriched?.filter((e) => {
        const status = e.status as EventStatusKey;
        return statusFilters[status];
    });

    if (params.venueFilter && params.venueFilter !== "-") {
        filtered = filtered?.filter((e) => e.venueId === params.venueFilter);
    }

    if (params.artistFilter && params.artistFilter !== "-") {
        filtered = filtered?.filter((e) => e.artistId === params.artistFilter);
    }

    filtered?.sort((a, b) => {
        const sa = a.status as EventStatusKey;
        const sb = b.status as EventStatusKey;

        return (
            EVENT_STATUS_ORDER.indexOf(sa) -
            EVENT_STATUS_ORDER.indexOf(sb)
        );
    });

    return filtered;
}

export function getFilterOptions(selectedFilters: Record<EventStatusKey, boolean>) {
    return EVENT_STATUS_ORDER.map((status) => ({
        value: status,
        label: filterStatusLabel[status],
        checked: selectedFilters[status],
    }));
}