import {billingApi, userIdentityApi} from "@api/axios.ts";
import {ApiRoutes} from "@api";
import type {
    Account,
    ProfileEditFormValues,
    ProfileResponseDTO,
    UpdateProfileDTO,
    VenueListResponseDTO
} from "@pages";
import {LatLng} from "leaflet";

export async function profileRequest(): Promise<ProfileResponseDTO> {
    const {data} = await userIdentityApi.get(ApiRoutes.PROFILE.ROOT);
    return data;
}

export async function updateProfileRequest(profile: UpdateProfileDTO) {
    const {data} = await userIdentityApi.patch(ApiRoutes.PROFILE.ROOT, profile);
    return data;
}

export async function getArtistList() {
    const {data} = await userIdentityApi.get(ApiRoutes.PROFILE.ARTISTS);
    return data;
}

export async function getFansList() {
    const {data} = await userIdentityApi.get(ApiRoutes.PROFILE.FANS);
    return data;
}

export async function getVenuesList(): Promise<VenueListResponseDTO> {
    const {data} = await userIdentityApi.get(ApiRoutes.PROFILE.VENUES);
    return data;
}

export async function getPersonalBankAccount(): Promise<Account> {
    const {data} = await billingApi.get(ApiRoutes.PROFILE.ACCOUNT);
    return data;
}

export async function getAdminStatistics() {
    const {data} = await userIdentityApi.get(ApiRoutes.ADMIN.STATS);
    return data;
}

//Mapping
export function mapProfileEditFormValuesToDTO(values: ProfileEditFormValues): UpdateProfileDTO {
    return {
        name: values.name,
        surname: values.surname,
        email: values.email || undefined,
        oldPassword: values.oldPassword || undefined,
        newPassword: values.newPassword || undefined,
        artistGenres: values.artistGenres?.length ? values.artistGenres : undefined,
        artistSocial: values.artistSocial || undefined,
        venueName: values.venueName || undefined,
        venueAddress: values.venueAddress ? new LatLng(values.venueAddress.latitude, values.venueAddress.longitude) : undefined,
    }
}