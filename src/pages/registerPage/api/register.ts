import api from "@api/axios.ts";
import {ApiRoutes} from "@api";
import type {UserTypeKey} from "@utils";
import type {JwtSessionResponseDTO} from "@pages/loginPage/api/types.ts";
import type {AxiosResponse} from "axios";
import type {RegisterDTORequestByType, VenueRegisterDTO,} from "@pages/registerPage/api/types.ts";
import type {LatLng} from "leaflet";

function normalizeVenueAddress(p: VenueRegisterDTO): LatLng {
    const a: any = p.venueAddress;
    const lat = a?.lat ?? p.venueAddress?.lat;
    const lng = a?.lng ?? p.venueAddress?.lng;

    if (typeof lat !== "number" || typeof lng !== "number") {
        throw new Error("Indirizzo non valido: lat/lng mancanti");
    }
    return {lat, lng} as LatLng;
}

type PayloadBuilderMap = {
    [K in UserTypeKey]: (p: RegisterDTORequestByType[K]) => RegisterDTORequestByType[K];
};

const payloadBuilders: PayloadBuilderMap = {
    FAN: (p) => ({
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
    }),

    ARTIST: (p) => ({
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
        artistGenres: p.artistGenres,
        artistSocial: p.artistSocial,
    }),

    VENUE: (p) => ({
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
        venueName: p.venueName,
        venueAddress: normalizeVenueAddress(p),
    }),
};

export async function registerRequest<T extends UserTypeKey>(
    type: T,
    payload: RegisterDTORequestByType[T]
): Promise<AxiosResponse<JwtSessionResponseDTO>> {
    const url = ApiRoutes.REGISTER.byType(type);
    const body = payloadBuilders[type](payload) as RegisterDTORequestByType[T];
    return api.post<JwtSessionResponseDTO>(url, body);
}
