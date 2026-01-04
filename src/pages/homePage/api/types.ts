import type {LatLng} from "leaflet";

export type ProfileResponseDTO = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    artistGenres?: string[];
    artistSocial?: string;
    venueName?: string;
    venueAddress?: {
        lat: number;
        lng: number;
    };
};

export type UpdateProfileDTO = {
    name?: string;
    surname?: string;
    email?: string;
    newPassword?: string;
    oldPassword?: string;
    artistGenres?: string[];
    artistSocial?: string;
    venueName?: string;
    venueAddress?: LatLng;
}

export type Account = {
    accountId: string;
    userId: string;
    balance: number;
    status: string;
    lastUpdate: string;
}

export type AccountResponseDTO = {
    accounts: Account[];
}

export type DepositRequestDTO = {
    amount: number;
}

export type ArtistProfileDTO = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    artistGenres: string[];
    artistSocial: string;
    enabled?: boolean;
    approved?: boolean;
}

export type VenueProfileDTO = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    venueName: string;
    venueAddress: {
        latitude: number;
        longitude: number;
    };
    enabled?: boolean;
}

export type FanProfileDTO = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    enabled?: boolean;
}

export type ProfileCounterDTO = {
    type: string;
    count: number;
}

export type StatisticDTO = {
    counters: ProfileCounterDTO[];
    artistApprovingRequestsCounter: number;
}

export type ArtistListResponseDTO = {
    artists: ArtistProfileDTO[];
}

export type FanListResponseDTO = {
    fans: FanProfileDTO[];
}

export type VenueListResponseDTO = {
    venues: VenueProfileDTO[];
}

export type FundraisingRequestDTO = {
    artistId: string;
    fundraisingName: string;
    venueId: string;
    targetAmount: number;
    eventDate: string;
}

export type EnrichFundraising = Fundraising & {
    artistName: string;
    venueName: string;
}
export type Fundraising = {
    fundraisingId: string;
    fundraisingName: string;
    artistId: string;
    venueId: string;
    currentAmount: number;
    targetAmount: number;
    status: string;
    eventDate: string;
    expirationDate: string;
}
export type FundraisingListResponseDTO = {
    fundraisings: Fundraising[];
}

export type EnrichEvent = Event & {
    artistName: string;
    venueName: string;
}
export type Event = {
    eventId: string;
    fundraisingId: string;
    artistId: string;
    venueId: string;
    status: string;
    eventName: string;
    eventDate: string;
}
export type EventListResponseDTO = {
    events: Event[];
}

export type EventVenueCounter = {
    venueId: string;
    eventCounter: number;
}

export type EventVenueCounterResponseDTO = {
    eventVenueCounters: EventVenueCounter[];
}

//Billing
export type FeePlan = Tax | Subscription;
export const FeeTypeEnum = {
    TAX: "TAX",
    SUBSCRIPTION: "SUBSCRIPTION",
} as const;
export type FeeTypeKey = keyof typeof FeeTypeEnum;
export const TaxNameEnum = {
    EVENT_TAX: "EVENT_TAX",
} as const;
export type TaxNameKey = keyof typeof TaxNameEnum;
export type Tax = {
    feePlanId: string;
    feeType: string;
    taxName: string;
    percentageOnTotal: number;
    activeSince: string;
}
export type Subscription = {
    feePlanId: string;
    feeType: string;
    isApplicatedTo: string[];
    feePeriod: string;
    amount: number;
    activeSince: string;
}
export type SubscriptionListResponseDTO = {
    subscriptions: Subscription[];
}
export type TaxListResponseDTO = {
    taxes: Tax[];
}
export type SubscriptionRequestDTO = {
    feePlanId?: string;
    feeType: FeeTypeKey;
    isApplicatedTo?: string[];
    feePeriod?: string;
    amount?: number;
    activeSince?: string;
}
export type TaxRequestDTO = {
    feePlanId?: string;
    feeType: FeeTypeKey;
    taxName?: TaxNameKey;
    percentageOnTotal?: number;
    activeSince?: string;
}
