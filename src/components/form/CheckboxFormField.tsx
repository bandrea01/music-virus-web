import React, { type ReactElement, type ReactNode, useCallback } from "react";
import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    type UseFormStateReturn,
} from "react-hook-form";
import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    type CheckboxProps,
    Box,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
}

export type CheckboxFormFieldProps<T extends FieldValues> = Omit<
    CheckboxProps,
    "name" | "checked" | "onChange" | "value" | "defaultChecked"
> & {
    name: FieldPath<T>;
    control: Control<T>;
    label?: ReactNode;
    helperText?: ReactNode;
    sxContainer?: SxProps<Theme>;
};

type CheckboxFormFieldRenderProps<T extends FieldValues> =
    FormFieldProps<T> & CheckboxFormFieldProps<T>;

function CheckboxFormFieldRender<T extends FieldValues>({
                                                            name,
                                                            control,
                                                            label,
                                                            helperText,
                                                            disabled,
                                                            sx,
                                                            sxContainer,
                                                            field,
                                                            fieldState,
                                                            formState,
                                                            ...others
                                                        }: CheckboxFormFieldRenderProps<T>): ReactNode {
    const { error } = fieldState;
    const { value, onChange, onBlur, ref } = field;

    const checked = Boolean(value);

    const handleChange = useCallback(
        (_: React.ChangeEvent<HTMLInputElement>, nextChecked: boolean) => {
            onChange(nextChecked);
        },
        [onChange]
    );

    return (
        <Box sx={sxContainer}>
            <FormControlLabel
                control={
                    <Checkbox
                        {...others}
                        inputRef={ref}
                        checked={checked}
                        onChange={handleChange}
                        onBlur={onBlur}
                        disabled={disabled || formState.isSubmitting}
                        sx={sx}
                    />
                }
                label={label}
            />

            {!disabled && (error?.message || helperText) && (
                <FormHelperText error={!!error} sx={{ marginLeft: "14px" }}>
                    {error?.message ?? helperText}
                </FormHelperText>
            )}
        </Box>
    );
}

export default function CheckboxFormField<T extends FieldValues>({
                                                                     name,
                                                                     control,
                                                                     ...others
                                                                 }: CheckboxFormFieldProps<T>): ReactElement {
    const memoRender = useCallback(
        ({
             field,
             fieldState,
             formState,
         }: {
            field: ControllerRenderProps<T>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<T>;
        }) => (
            <CheckboxFormFieldRender
                field={field}
                fieldState={fieldState}
                formState={formState}
                name={name}
                control={control}
                {...others}
            />
        ),
        [control, name, others]
    );

    return <Controller control={control} name={name} render={memoRender} />;
}
