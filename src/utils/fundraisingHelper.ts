import type {EnrichFundraising} from "@pages";
import {FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";

export const FUNDRAISING_STATUS_ORDER: FundraisingStatusKey[] = [
    FundraisingStatusEnum.ACTIVE,
    FundraisingStatusEnum.ACHIEVED,
    FundraisingStatusEnum.NOT_ACHIEVED,
    FundraisingStatusEnum.CANCELLED,
];

type RawFundraising = Omit<EnrichFundraising, "artistName" | "venueName">;

type ArtistLike = {
    userId: string;
    name: string;
    surname: string;
};

type VenueLike = {
    userId: string;
    venueName: string;
};

export function buildEnrichedFundraisings(
    params: {
        personalFundraisings: RawFundraising[];
        artists: ArtistLike[];
        venues: VenueLike[];
        statusFilters: Record<FundraisingStatusKey, boolean>;
    }
): EnrichFundraising[] {
    const {personalFundraisings, artists, venues, statusFilters} = params;

    const enriched: EnrichFundraising[] = personalFundraisings.map((fundraising) => {
        const artist = artists.find(a => a.userId === fundraising.artistId);
        const venue = venues.find(v => v.userId === fundraising.venueId);

        return {
            ...fundraising,
            artistName: artist ? `${artist.name} ${artist.surname}` : "",
            venueName: venue ? venue.venueName : "",
        };
    });

    const filtered = enriched.filter((f) => {
        const status = f.status as FundraisingStatusKey;
        return statusFilters[status];
    });

    filtered.sort((a, b) => {
        const sa = a.status as FundraisingStatusKey;
        const sb = b.status as FundraisingStatusKey;

        return (
            FUNDRAISING_STATUS_ORDER.indexOf(sa) -
            FUNDRAISING_STATUS_ORDER.indexOf(sb)
        );
    });

    return filtered;
}
