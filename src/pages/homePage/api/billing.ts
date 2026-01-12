import {ApiRoutes, billingApi} from "@api";
import type {ContributionRequestDTO, DepositRequestDTO} from "@pages";

export async function deposit(payload: DepositRequestDTO) {
    const {data} = await billingApi.patch(ApiRoutes.BILLING.DEPOSIT, payload);
    return data;
}

export async function sendContribution(payload: ContributionRequestDTO) {
    const {data} = await billingApi.post(ApiRoutes.BILLING.CONTRIBUTION, payload);
    return data;
}