import {userIdentityApi} from "@api/axios.ts";
import type {JwtSessionResponseDTO, LoginDTO} from "./types.ts";
import {ApiRoutes} from "@api";

export async function loginRequest(payload: LoginDTO): Promise<JwtSessionResponseDTO> {
    const {data} = await userIdentityApi.post<JwtSessionResponseDTO>(ApiRoutes.LOGIN, payload);
    return data;
}