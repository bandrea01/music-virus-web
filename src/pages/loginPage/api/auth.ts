import api from "../../../apiService/axios.ts";
import type {JwtSessionResponseDTO, LoginDTO} from "./types.ts";
import {RoutesEnum} from "@/apiService/routesEnum.ts";

export async function loginRequest(payload: LoginDTO): Promise<JwtSessionResponseDTO> {
    const { data } = await api.post<JwtSessionResponseDTO>(RoutesEnum.AUTH, payload);
    return data;
}