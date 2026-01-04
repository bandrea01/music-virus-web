import {billingApi, userIdentityApi} from "@api/axios.ts";
import {ApiRoutes} from "@api";
import type {SubscriptionRequestDTO, TaxRequestDTO} from "@pages";

export async function getAdminArtistsList() {
    const {data} = await userIdentityApi.get(ApiRoutes.ADMIN.ARTISTS);
    return data;

}
export async function getAdminVenuesList() {
    const {data} = await userIdentityApi.get(ApiRoutes.ADMIN.VENUES);
    return data;
}
export async function getAdminFansList() {
    const {data} = await userIdentityApi.get(ApiRoutes.ADMIN.FANS);
    return data;
}

export async function approveArtist(artistId: string) {
    const {data} = await userIdentityApi.patch( `${ApiRoutes.ADMIN.APPROVE_ARTIST(artistId)}`);
    return data;
}

export async function unapproveArtist(artistId: string) {
    const {data} = await userIdentityApi.patch(`${ApiRoutes.ADMIN.UNAPPROVE_ARTIST(artistId)}`);
    return data;
}

export async function banUser(userId: string) {
    const {data} = await userIdentityApi.patch(`${ApiRoutes.ADMIN.BAN_USER(userId)}`);
    return data;
}

export async function unbanUser(userId: string) {
    const {data} = await userIdentityApi.patch(`${ApiRoutes.ADMIN.UNBAN_USER(userId)}`);
    return data;
}

export async function getSubscriptions() {
    const {data} = await billingApi.get(ApiRoutes.FEE.SUBSCRIPTIONS.ROOT);
    return data;
}

export async function getTaxes() {
    const {data} = await billingApi.get(ApiRoutes.FEE.TAXES.ROOT);
    return data;
}

export async function createSubscription(payload: SubscriptionRequestDTO) {
    const {data} = await billingApi.post(ApiRoutes.ADMIN.SUBSCRIPTIONS.ROOT, payload);
    return data;
}

export async function editSubscription(feePlanId: string, payload: SubscriptionRequestDTO) {
    const {data} = await billingApi.patch(ApiRoutes.ADMIN.SUBSCRIPTIONS.EDIT(feePlanId), payload);
    return data;
}

export async function deleteSubscription(feePlanId: string) {
    const {data} = await billingApi.delete(ApiRoutes.ADMIN.SUBSCRIPTIONS.EDIT(feePlanId));
    return data;
}

export async function createTax(payload: TaxRequestDTO) {
    const {data} = await billingApi.post(ApiRoutes.ADMIN.TAXES.ROOT, payload);
    return data;
}

export async function editTax(feePlanId: string, payload: SubscriptionRequestDTO) {
    const {data} = await billingApi.patch(ApiRoutes.ADMIN.TAXES.EDIT(feePlanId), payload);
    return data;
}

export async function deleteTax(feePlanId: string) {
    const {data} = await billingApi.delete(ApiRoutes.ADMIN.TAXES.EDIT(feePlanId));
    return data;
}
