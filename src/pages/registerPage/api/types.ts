import type {LatLng} from "leaflet";

//Register
export type RegisterBaseDTO = {
    name: string,
    surname: string,
    email: string;
    password: string;
}

export interface ArtistRegisterDTO extends RegisterBaseDTO {
    artistGenres: string[];
    artistSocial: string;
}

export interface VenueRegisterDTO extends RegisterBaseDTO {
    venueName: string;
    venueAddress: LatLng;
}

export type RegisterDTORequestByType = {
    FAN: RegisterBaseDTO;
    ARTIST: ArtistRegisterDTO;
    VENUE: VenueRegisterDTO;
}