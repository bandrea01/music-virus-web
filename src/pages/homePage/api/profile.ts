import {userIdentityApi} from "@apiService/axios.ts";
import {RoutesEnum} from "@/apiService/routesEnum.ts";
import type {ProfileEditFormValues, ProfileResponseDTO, UpdateProfileDTO} from "@pages";

export async function profileRequest(): Promise<ProfileResponseDTO> {
    const {data} = await userIdentityApi.get(RoutesEnum.PROFILE);
    return data;
}

export async function updateProfileRequest(profile: UpdateProfileDTO) {
    const {data} = await userIdentityApi.patch(RoutesEnum.PROFILE, profile);
    return data;
}

export async function getArtistList() {
    const {data} = await userIdentityApi.get(RoutesEnum.ARTIST_LIST);
    return data;
}

export async function getFansList() {
    const {data} = await userIdentityApi.get(RoutesEnum.FAN_LIST);
    return data;
}

export async function getVenuesList() {
    const {data} = await userIdentityApi.get(RoutesEnum.VENUE_LIST);
    console.log('venues', data);
    return data;
}

export async function getAdminStatistics() {
    const {data} = await userIdentityApi.get(RoutesEnum.ADMIN_STATS);
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
        venueAddress: values.venueAddress || undefined,
    }
}