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

export async function getAllPersonalTransactions() {
    const {data} = await billingApi.get(ApiRoutes.BILLING.ALL_TRANSACTIONS);
    return data;
}

export async function getLast10IncomingPersonalTransactions() {
    const {data} = await billingApi.get(ApiRoutes.BILLING.LAST_10_INCOMING_TRANSACTIONS);
    return data;
}

export async function getLast10PersonalTransactions() {
    const {data} = await billingApi.get(ApiRoutes.BILLING.LAST_10_TRANSACTIONS);
    return data;
}

export async function getPersonalTickets() {
    const {data} = await billingApi.get(ApiRoutes.BILLING.TICKETS);
    return data;
}

export async function getTicket(ticketId: string) {
    const {data} = await billingApi.get(ApiRoutes.BILLING.TICKET(ticketId));
    return data;
}