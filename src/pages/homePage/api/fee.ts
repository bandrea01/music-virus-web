import {ApiRoutes, billingApi} from "@api";

export async function getArtistsSubscriptions() {
    const {data} = await billingApi.get(ApiRoutes.FEE.SUBSCRIPTIONS.ARTISTS);
    return data;
}

export async function getVenuesFeePlans() {
    const {data} = await billingApi.get(ApiRoutes.FEE.SUBSCRIPTIONS.VENUES);
    return data;
}

export async function getFansFeePlans() {
    const {data} = await billingApi.get(ApiRoutes.FEE.SUBSCRIPTIONS.FANS);
    return data;
}