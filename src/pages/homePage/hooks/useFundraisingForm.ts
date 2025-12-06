import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    type AddEditFundraisingFormValues,
    getAddEditFundriasingSchemaAndDefaults
} from "@pages/homePage/form/addEditFundraisingSchema.ts";
import type {Fundraising} from "@/pages";


export interface UseFundraisingFormProps {
    fundraising?: Fundraising | null
}

export interface UseAddEditFundraisingFormReturn {
    form: UseFormReturn<AddEditFundraisingFormValues>
}

export function useAddEditFundraisingForm({
                                              fundraising
                                          }: UseFundraisingFormProps): UseAddEditFundraisingFormReturn {
    const {schema, defaultValues} = useMemo(() => getAddEditFundriasingSchemaAndDefaults(fundraising), [fundraising]);
    const form =
        useForm<AddEditFundraisingFormValues>({
            defaultValues: defaultValues,
            resolver: zodResolver(schema),
            mode: 'onChange',
        });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    return {form};
}