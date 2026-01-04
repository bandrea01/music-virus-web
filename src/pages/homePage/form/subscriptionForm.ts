import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import type {Subscription} from "@/pages";

export const addEditSubscriptionSchema = z.object({
    isApplicatedTo: z.array(z.string()).min(1, 'Seleziona almeno una opzione'),
    feePeriod: z.string().min(1, 'Seleziona un periodo tariffario'),
    amount: z.coerce.number().min(0, 'L\'importo deve essere almeno 1 euro'),
    activeSince: z.coerce.date().min(new Date(new Date().setHours(0,0,0,0)), 'La data di attivazione non può essere nel passato'),
});

export const getSubscriptionDefaultValues = (subscription: Subscription | null | undefined) => {
    return {
        isApplicatedTo: subscription?.isApplicatedTo ?? [],
        feePeriod: subscription?.feePeriod ?? '',
        amount: subscription?.amount ?? 1,
        activeSince: subscription ? new Date(subscription.activeSince) : new Date(),
    };
};

export type AddEditSubscriptionFormValues = z.infer<typeof addEditSubscriptionSchema>;

export const getAddEditSubscriptionSchemaAndDefaults = (subscription: Subscription | null | undefined) => {
    const schema = addEditSubscriptionSchema;
    const defaultValues = getSubscriptionDefaultValues(subscription);
    return {schema, defaultValues};
};


export interface UseSubscriptionFormProps {
    subscription?: Subscription | null
}

export interface UseAddEditSubscriptionFormReturn {
    form: UseFormReturn<AddEditSubscriptionFormValues>
}

export function useAddEditSubscriptionForm({
                                          subscription
                                      }: UseSubscriptionFormProps): UseAddEditSubscriptionFormReturn {
    const {schema, defaultValues} = useMemo(() => getAddEditSubscriptionSchemaAndDefaults(subscription), [subscription]);
    const form =
        useForm<AddEditSubscriptionFormValues>({
            defaultValues: defaultValues,
            resolver: zodResolver(schema),
            mode: 'onChange',
        });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    return {form};
}