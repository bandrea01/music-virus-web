// api/auth.ts
import api from './axios';
import type {ArtistRegisterDTO, RegisterBaseDTO, RegisterDTORequestByType, UserTypeId, VenueRegisterDTO,} from './types';
import {RoutesEnum} from "./routesEnum.ts";

const registerPathByType: Record<UserTypeId, string> = {
    fan: RoutesEnum.FAN_REGISTER,
    artist: RoutesEnum.ARTIST_REGISTER,
    venue: RoutesEnum.VENUE_REGISTER,
};

export function registerRequest(type: 'fan', payload: RegisterBaseDTO): Promise<void>;
export function registerRequest(type: 'artist', payload: ArtistRegisterDTO): Promise<void>;
export function registerRequest(type: 'venue', payload: VenueRegisterDTO): Promise<void>;

export async function registerRequest<T extends UserTypeId>(
    type: T,
    payload: RegisterDTORequestByType[T]
): Promise<void> {
    const url = registerPathByType[type];
    await api.post<void>(url, payload);
}
