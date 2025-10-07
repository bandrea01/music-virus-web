import api from './axios';
import type {
    ArtistRegisterDTO,
    RegisterBaseDTO as FanRegisterDTO,
    RegisterDTORequestByType,
    UserTypeId,
    VenueRegisterDTO,
} from './types';
import {RoutesEnum} from './routesEnum';

const registerPathByType: Record<UserTypeId, string> = {
    fan: RoutesEnum.FAN_REGISTER,
    artist: RoutesEnum.ARTIST_REGISTER,
    venue: RoutesEnum.VENUE_REGISTER,
};

function toFan(p: FanRegisterDTO) {
    return {
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
    };
}

function toArtist(p: ArtistRegisterDTO) {
    return {
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
        artistGenres: p.artistGenres,
        artistSocial: p.artistSocial,
    };
}

function toVenue(p: VenueRegisterDTO) {
    const lat = (p.address as any)?.lat ?? p.address?.lat;
    const lng = (p.address as any)?.lng ?? p.address?.lng;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        throw new Error('Indirizzo non valido: lat/lng mancanti');
    }
    return {
        name: p.name,
        surname: p.surname,
        email: p.email,
        password: p.password,
        venueName: p.venueName,
        venueAddress: { lat, lng },
    };
}

function assertNever(x: never): never {
    throw new Error(`Unknown user type: ${x as string}`);
}

export async function registerRequest<T extends UserTypeId>(
    type: T,
    payload: RegisterDTORequestByType[T]
): Promise<void> {
    const url = registerPathByType[type];

    const body =
        type === 'fan'
            ? toFan(payload as FanRegisterDTO)
            : type === 'artist'
                ? toArtist(payload as ArtistRegisterDTO)
                : type === 'venue'
                    ? toVenue(payload as VenueRegisterDTO)
                    : assertNever(type as never);

    await api.post<void>(url, body);
}
