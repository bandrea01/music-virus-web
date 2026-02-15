import {useEffect, useMemo, useRef} from "react";
import {useForm, type UseFormReturn, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type UserTypeKey} from "@utils";
import {
  type AddEditUserMode,
  getAddEditUserSchemaAndDefaults,
  initialUsersCreateValues,
  type UserFormValues,
  type UserProfile
} from "@pages";

export interface UseAddEditUserFormProps {
  mode: AddEditUserMode;
  user?: UserProfile | null;
  allowUserTypeChange?: boolean;
}

export interface UseAddEditUserFormReturn {
  form: UseFormReturn<UserFormValues>;
}

export function useAddEditUserForm({
                                     mode,
                                     user,
                                     allowUserTypeChange = mode === "create",
                                   }: UseAddEditUserFormProps): UseAddEditUserFormReturn {
  const {schema, defaultValues} = useMemo(
    () => getAddEditUserSchemaAndDefaults(mode, user),
    [mode, user]
  );

  const form = useForm<UserFormValues>({
    defaultValues: defaultValues as UserFormValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {control, getValues, reset} = form;

  useEffect(() => {
    reset(defaultValues as UserFormValues, {
      keepDefaultValues: false,
      keepDirty: false,
      keepTouched: false,
    });
  }, [defaultValues, reset]);

  const userType = useWatch({control, name: "userType"});
  const previousUserType = useRef<UserTypeKey>();

  useEffect(() => {
    if (!allowUserTypeChange || !userType) return;
    if (previousUserType.current === userType) return;

    previousUserType.current = userType;

    const values = getValues();

    reset(
      {
        ...(initialUsersCreateValues[userType] as UserFormValues),
        ...(values as UserFormValues),
        userType,
      } as UserFormValues,
      {keepDirty: false, keepTouched: false, keepDefaultValues: false}
    );
  }, [userType, allowUserTypeChange, getValues, reset]);

  return {form};
}
