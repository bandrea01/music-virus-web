import {userIdentityApi} from "@api/axios.ts";
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
    [K in UserTypeKey]: (payload: RegisterDTORequestByType[K]) => RegisterDTORequestByType[K];
};

const payloadBuilders: PayloadBuilderMap = {
    FAN: (payload) => ({
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        password: payload.password,
    }),

    ARTIST: (payload) => ({
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        password: payload.password,
        artistGenres: payload.artistGenres,
        artistSocial: payload.artistSocial,
    }),

    VENUE: (payload) => ({
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        password: payload.password,
        venueName: payload.venueName,
        venueAddress: normalizeVenueAddress(payload),
    }),
};

export async function registerRequest(
    userTypeKey: UserTypeKey,
    payload: RegisterDTORequestByType[UserTypeKey]
): Promise<AxiosResponse<JwtSessionResponseDTO>> {
    const url = ApiRoutes.REGISTER.byType(userTypeKey.toLowerCase());
    const body = payloadBuilders[userTypeKey](payload as any);
    return userIdentityApi.post<JwtSessionResponseDTO>(url, body);
}
