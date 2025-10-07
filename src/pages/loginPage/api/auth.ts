import api from "../../../axios/axios.ts";
import type {JwtSessionResponseDTO, LoginDTO} from "../../../axios/types.ts";
import {RoutesEnum} from "../../../axios/routesEnum.ts";

export async function loginRequest(payload: LoginDTO): Promise<JwtSessionResponseDTO> {
    const { data } = await api.post<JwtSessionResponseDTO>(RoutesEnum.AUTH, payload);
    return data;
}