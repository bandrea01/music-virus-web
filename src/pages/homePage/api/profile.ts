import api from "../../../axios/axios.ts";
import {RoutesEnum} from "../../../axios/routesEnum.ts";
import type {ProfileResponseDTO} from "./types.ts";

export async function profileRequest(): Promise<ProfileResponseDTO> {
    const { data } = await api.get(RoutesEnum.PROFILE);

    return data;
}