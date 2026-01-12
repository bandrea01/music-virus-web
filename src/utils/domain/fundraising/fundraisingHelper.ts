import {
    type AddEditFundraisingFormValues, type ContributionFormValues,
    type ContributionRequestDTO, ContributionVisibilityEnum,
    type EnrichFundraising,
    type Fundraising,
    type FundraisingRequestDTO
} from "@pages";
import {FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";

export const FUNDRAISING_STATUS_ORDER: FundraisingStatusKey[] = [
    FundraisingStatusEnum.ACHIEVED,
    FundraisingStatusEnum.ACTIVE,
    FundraisingStatusEnum.CONFIRMED,
    FundraisingStatusEnum.NOT_ACHIEVED,
    FundraisingStatusEnum.CANCELLED,
];

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
        personalFundraisings: Fundraising[];
        artists: ArtistLike[] | undefined;
        venues: VenueLike[] | undefined;
        statusFilters: Record<FundraisingStatusKey, boolean>;
    }
): EnrichFundraising[] {
    const {personalFundraisings, artists, venues, statusFilters} = params;

    const enriched: EnrichFundraising[] = personalFundraisings.map((fundraising) => {
        const artist = artists?.find(a => a.userId === fundraising.artistId);
        const venue = venues?.find(v => v.userId === fundraising.venueId);

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

export function mapFundraisingFormValuesToDTO(
    artistId: string,
    values: AddEditFundraisingFormValues
): FundraisingRequestDTO {
    return {
        artistId: artistId,
        fundraisingName: values.fundraisingName,
        venueId: values.venueId,
        targetAmount: values.targetAmount,
        eventDate: values.eventDate.toISOString()
    };
}

export function mapContributionFormValuesToDTO(
    fundraisingId: string,
    artistId: string,
    userId: string,
    values: ContributionFormValues
): ContributionRequestDTO {
    return {
        fundraisingId: fundraisingId,
        artistId: artistId,
        userId: userId,
        amount: values.amount,
        contributionVisibility: (values.contributionVisibility ? ContributionVisibilityEnum.PUBLIC : ContributionVisibilityEnum.ANONYMOUS)
    }
}
