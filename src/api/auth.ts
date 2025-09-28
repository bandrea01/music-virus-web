import api from "./axios.ts";
import type {JwtSessionDTO, LoginDTO} from "./types.ts";

export async function loginRequest(payload: LoginDTO): Promise<JwtSessionDTO> {
    const { data } = await api.post<JwtSessionDTO>('/api/auth/login', payload);
    return data;
}