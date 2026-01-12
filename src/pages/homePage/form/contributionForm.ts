import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';

export const contributionSchema = z.object({
    amount: z.coerce.number()
        .min(1, "L'importo deve essere almeno 1 euro"),
    contributionVisibility: z.boolean(),
});

export const getContributionDefaultValues = () => {
    return {
        amount: 1,
        contributionVisibility: true,
    };
};

export type ContributionFormValues = z.infer<typeof contributionSchema>;

export const getContributionSchemaAndDefaults = () => {
    const schema = contributionSchema;
    const defaultValues = getContributionDefaultValues();
    return {schema, defaultValues};
};

export interface UseContributionFormReturn {
    form: UseFormReturn<ContributionFormValues>
}

export function useContributionForm(): UseContributionFormReturn {
    const {schema, defaultValues} = useMemo(() => getContributionSchemaAndDefaults(), []);
    const form =
        useForm<ContributionFormValues>({
            defaultValues: defaultValues,
            resolver: zodResolver(schema),
            mode: 'onChange',
        });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    return {form};
}