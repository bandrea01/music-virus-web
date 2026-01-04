import {ApiRoutes, billingApi} from "@api";
import type {DepositRequestDTO} from "@pages";

export async function deposit(accountId: string, payload: DepositRequestDTO) {
    const {data} = await billingApi.patch(ApiRoutes.BILLING.DEPOSIT(accountId), payload);
    return data;
}