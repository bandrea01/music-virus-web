import {
    type AddEditTaxFormValues,
    FeeTypeEnum,
    type SubscriptionRequestDTO,
    type TaxNameKey,
    type TaxRequestDTO
} from "@pages";
import type {AddEditSubscriptionFormValues} from "@pages/homePage/form/subscriptionForm.ts";

export function mapSubscriptionFormValuesToDTO(
    feePlanId: string,
    values: AddEditSubscriptionFormValues
): SubscriptionRequestDTO {
    return {
        feePlanId: feePlanId,
        feeType: FeeTypeEnum.SUBSCRIPTION,
        feePeriod: values.feePeriod,
        isApplicatedTo: values.isApplicatedTo,
        amount: values.amount,
        activeSince: values.activeSince.toISOString(),
    };
}

export function mapTaxFormValuesToDTO(
    feePlanId: string,
    values: AddEditTaxFormValues
): TaxRequestDTO {
    return {
        feePlanId: feePlanId,
        feeType: FeeTypeEnum.TAX,
        taxName: values.taxName as TaxNameKey,
        percentageOnTotal: values.percentageOnTotal,
        activeSince: values.activeSince.toISOString(),
    };
}