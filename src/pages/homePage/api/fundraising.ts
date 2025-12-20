import {eventFundraisingApi} from "@apiService/axios.ts";
import {RoutesEnum} from "@apiService/routesEnum.ts";
import type {FundraisingRequestDTO} from "@pages";

export async function createFundraising(payload: FundraisingRequestDTO) {
    const {data} = await eventFundraisingApi.post(RoutesEnum.FUNDRAISING, payload);
    return data;
}

export async function getOthersFundraisingList() {
    const {data} = await eventFundraisingApi.get(RoutesEnum.FUNDRAISING);
    return data;
}

export async function getPersonalFundraisingList() {
    const {data} = await eventFundraisingApi.get(RoutesEnum.ARTIST_FUNDRAISING);
    return data;
}

export async function confirmFundraising(fundraisingId: string) {
    const {data} = await eventFundraisingApi.patch(`${RoutesEnum.CONFIRM_FUNDRAISING}`.replace('$1', fundraisingId));
    return data;
}

export async function editFundraising(fundraisingId: string, payload: FundraisingRequestDTO) {
    const {data} = await eventFundraisingApi.patch(`${RoutesEnum.EDIT_FUNDRAISING}`.replace('$1', fundraisingId), payload);
    return data;
}

export async function cancelFundraising(fundraisingId: string) {
    const {data} = await eventFundraisingApi.patch(`${RoutesEnum.DELETE_FUNDRAISING}`.replace('$1', fundraisingId));
    return data;
}