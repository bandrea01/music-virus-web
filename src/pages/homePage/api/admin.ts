import api from "@apiService/axios.ts";
import {RoutesEnum} from "@apiService/routesEnum.ts";

export async function approveArtist(artistId: string) {
    const {data} = await api.patch( `${RoutesEnum.APPROVE_ARTIST}/${artistId}`);
    return data;
}

export async function unapproveArtist(artistId: string) {
    const {data} = await api.patch(`${RoutesEnum.UNAPPROVE_ARTIST}/${artistId}`);
    return data;
}

export async function banUser(userId: string) {
    const {data} = await api.patch(`${RoutesEnum.BAN_USER}/${userId}`);
    return data;
}

export async function unbanUser(userId: string) {
    const {data} = await api.patch(`${RoutesEnum.UNBAN_USER}/${userId}`);
    return data;
}