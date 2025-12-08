import {userIdentityApi} from "@apiService/axios.ts";
import {RoutesEnum} from "@apiService/routesEnum.ts";

export async function getAdminArtistsList() {
    const {data} = await userIdentityApi.get(RoutesEnum.ADMIN_ARTISTS);
    return data;

}
export async function getAdminVenuesList() {
    const {data} = await userIdentityApi.get(RoutesEnum.ADMIN_VENUES);
    return data;
}
export async function getAdminFansList() {
    const {data} = await userIdentityApi.get(RoutesEnum.ADMIN_FANS);
    return data;
}

export async function approveArtist(artistId: string) {
    const {data} = await userIdentityApi.patch( `${RoutesEnum.APPROVE_ARTIST}`.replace('$1', artistId));
    return data;
}

export async function unapproveArtist(artistId: string) {
    const {data} = await userIdentityApi.patch(`${RoutesEnum.UNAPPROVE_ARTIST}`.replace('$1', artistId));
    return data;
}

export async function banUser(userId: string) {
    const {data} = await userIdentityApi.patch(`${RoutesEnum.BAN_USER}`.replace('$1', userId));
    return data;
}

export async function unbanUser(userId: string) {
    const {data} = await userIdentityApi.patch(`${RoutesEnum.UNBAN_USER}`.replace('$1', userId));
    return data;
}

