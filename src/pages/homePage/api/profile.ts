import api from "../../../apiService/axios.ts";
import {RoutesEnum} from "@/apiService/routesEnum.ts";
import type {ProfileResponseDTO, UpdateProfileDTO} from "./types.ts";
import type {ProfileEditFormValues} from "../form/profileEditSchema.ts";

export async function profileRequest(): Promise<ProfileResponseDTO> {
    const {data} = await api.get(RoutesEnum.PROFILE);
    return data;
}

export async function updateProfileRequest(profile: UpdateProfileDTO) {
    const {data} = await api.patch(RoutesEnum.PROFILE, profile);
    return data;
}

export async function getArtistList() {
    const {data} = await api.get(RoutesEnum.ARTIST_LIST);
    return data;
}

export async function getUsersList() {
    const {data} = await api.get(RoutesEnum.FAN_LIST);
    console.log(data);
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