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
    artistGenres?: string[];
    artistSocial?: string;
    venueName?: string;
    venueAddress?: {
        lat: number;
        lng: number;
    };
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
}
export type FundraisingListResponseDTO = {
    fundraisings: Fundraising[];
}


