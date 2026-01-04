import {eventFundraisingApi} from "@api/axios.ts";
import {ApiRoutes} from "@api";
import type {FundraisingRequestDTO} from "@pages";

export async function createFundraising(payload: FundraisingRequestDTO) {
    const {data} = await eventFundraisingApi.post(ApiRoutes.FUNDRAISING.ROOT, payload);
    return data;
}

export async function getOthersFundraisingList() {
    const {data} = await eventFundraisingApi.get(ApiRoutes.FUNDRAISING.ROOT);
    return data;
}

export async function getPersonalFundraisingList() {
    const {data} = await eventFundraisingApi.get(ApiRoutes.FUNDRAISING.ME);
    return data;
}

export async function confirmFundraising(fundraisingId: string) {
    const {data} = await eventFundraisingApi.patch(`${ApiRoutes.FUNDRAISING.CONFIRM(fundraisingId)}`);
    return data;
}

export async function editFundraising(fundraisingId: string, payload: FundraisingRequestDTO) {
    const {data} = await eventFundraisingApi.patch(`${ApiRoutes.FUNDRAISING.EDIT(fundraisingId)}`, payload);
    return data;
}

export async function cancelFundraising(fundraisingId: string) {
    const {data} = await eventFundraisingApi.patch(`${ApiRoutes.FUNDRAISING.CANCEL(fundraisingId)}`);
    return data;
}