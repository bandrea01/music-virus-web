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
    enabled: boolean;
    approved: boolean;
}

export type UserProfileDTO = {
    userId: string;
    name: string;
    surname: string;
    email: string;
    enabled: boolean;
}

export type ArtistListResponseDTO = {
    artists: ArtistProfileDTO[];
}

export type UserListResponseDTO = {
    fans: UserProfileDTO[];
}