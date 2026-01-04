import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import type {Tax} from "@/pages";

export const addEditTaxSchema = z.object({
    taxName: z.string().min(1, 'Il nome della tassazione è obbligatorio'),
    percentageOnTotal: z.coerce.number().min(1, 'La percentuale sull\'importo totale deve essere almeno dell\'1%'),
    activeSince: z.coerce.date().min(new Date(new Date().setHours(0,0,0,0)), 'La data di attivazione non può essere nel passato'),
});

export const getTaxDefaultValues = (tax: Tax | null | undefined) => {
    return {
        taxName: tax?.taxName ?? '',
        percentageOnTotal: tax?.percentageOnTotal ?? 1,
        activeSince: tax ? new Date(tax.activeSince) : new Date(),
    };
};

export type AddEditTaxFormValues = z.infer<typeof addEditTaxSchema>;

export const getAddEditTaxSchemaAndDefaults = (tax: Tax | null | undefined) => {
    const schema = addEditTaxSchema;
    const defaultValues = getTaxDefaultValues(tax);
    return {schema, defaultValues};
};


export interface UseTaxFormProps {
    tax?: Tax | null
}

export interface UseAddEditTaxFormReturn {
    form: UseFormReturn<AddEditTaxFormValues>
}

export function useAddEditTaxForm({
                                          tax
                                      }: UseTaxFormProps): UseAddEditTaxFormReturn {
    const {schema, defaultValues} = useMemo(() => getAddEditTaxSchemaAndDefaults(tax), [tax]);
    const form =
        useForm<AddEditTaxFormValues>({
            defaultValues: defaultValues,
            resolver: zodResolver(schema),
            mode: 'onChange',
        });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    return {form};
}