
//Common
import type {LatLng} from "leaflet";

export type UserTypeId = "fan" | "artist" | "venue";

//Login

export type JwtSessionResponseDTO = {
    userId: string;
    jwt: string;
};

export type LoginDTO = {
    email: string;
    password: string;
};


//Register
export type RegisterBaseDTO = {
    name: string,
    surname: string,
    email: string;
    password: string;
}

export interface ArtistRegisterDTO extends RegisterBaseDTO {
    artistGenres: string[];
    artistSocials: string[];
}

export interface VenueRegisterDTO extends RegisterBaseDTO {
    venueName: string;
    address: LatLng;
}

export type RegisterDTORequestByType = {
    fan: RegisterBaseDTO;
    artist: ArtistRegisterDTO;
    venue: VenueRegisterDTO;
}