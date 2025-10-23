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