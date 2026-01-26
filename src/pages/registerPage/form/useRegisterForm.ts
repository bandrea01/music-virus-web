import {
    getUserRegisterSchema,
    initialValuesByType,
    type UserRegisterFormValues,
    type UserRegisterRequest,
} from "@pages";
import {useForm, type UseFormReturn, useWatch} from "react-hook-form";
import {useEffect, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserTypeEnum} from "@utils";


export interface UseUserRegisterFormProps {
    initialValues: Partial<UserRegisterFormValues>
}

export interface UseUserRegisterFormReturn {
    form: UseFormReturn<UserRegisterFormValues>
}

export function useUserRegisterForm({
                                        initialValues,
                                    }: UseUserRegisterFormProps): UseUserRegisterFormReturn {

    const schema = useMemo(() => getUserRegisterSchema(), []);

    const form = useForm<UserRegisterRequest>({
        defaultValues: initialValues,
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const userType = useWatch({ control: form.control, name: "userType" });

    useEffect(() => {
        form.reset(initialValues, {
            keepDefaultValues: false,
            keepDirty: false,
            keepTouched: false,
        });
    }, [initialValues, form]);

    useEffect(() => {
        if (!userType) return;

        const valid =
          userType === UserTypeEnum.FAN ||
          userType === UserTypeEnum.ARTIST ||
          userType === UserTypeEnum.VENUE;

        if (!valid) return;

        const values = form.getValues();

        const commons = {
            userType: values.userType,
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        form.reset(
          {
              ...commons,
              ...initialValuesByType[userType],
          } as any,
          {
              keepDefaultValues: false,
              keepDirty: false,
              keepTouched: false,
          }
        );
    }, [userType, form]);

    return { form };
}