import {
    getUserRegisterSchema,
    initialValuesByType,
    type UserRegisterFormValues,
    type UserRegisterRequest,
} from "./registerSchema.ts";
import {useForm, type UseFormReturn} from "react-hook-form";
import {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";


export interface UseUserRegisterFormProps {
    initialValues: Partial<UserRegisterFormValues>
}

export interface UseUserRegisterFormReturn {
    form: UseFormReturn<UserRegisterFormValues>
}

export function useUserRegisterForm({
                                        initialValues
                                    }: UseUserRegisterFormProps): UseUserRegisterFormReturn {
    const schema = getUserRegisterSchema();
    const form =
        useForm<UserRegisterRequest>({
            defaultValues: initialValues,
            resolver: zodResolver(schema),
            mode: 'onChange',
        });

    useEffect(() => {
        const subscription = form.watch((_values, info) => {
            if (info.name !== "userType") return;

            const type = form.getValues("userType");

            const commons = {
                userType: type,
                name: form.getValues("name"),
                surname: form.getValues("surname"),
                email: form.getValues("email"),
                password: form.getValues("password"),
                confirmPassword: form.getValues("confirmPassword"),
            };

            form.reset(
                {
                    ...commons,
                    ...initialValuesByType[type],
                } as any,
                {
                    keepDefaultValues: false,
                    keepDirty: false,
                    keepTouched: false,
                }
            );
        });

        return () => subscription.unsubscribe();
    }, [form]);


    useEffect(() => {
        form.reset(initialValues);
    }, [initialValues, form]);

    return {form};
}