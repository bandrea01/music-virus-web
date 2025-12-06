import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    type UseFormStateReturn,
} from "react-hook-form";
import {type TextFieldProps} from "@mui/material";
import {DateTimePicker, type DateTimePickerProps,} from "@mui/x-date-pickers/DateTimePicker";
import {type ReactNode} from "react";

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
}

export type DatePickerFormFieldProps<T extends FieldValues> =
    Omit<DateTimePickerProps<any>, "value" | "onChange" | "slotProps"> & {
    name: FieldPath<T>;
    control: Control<T>;
    fullWidth?: boolean;
    textFieldProps?: Omit<TextFieldProps, "value" | "onChange">;
};

export type DatePickerFormFieldRenderProps<T extends FieldValues> =
    FormFieldProps<T> & DatePickerFormFieldProps<T>;

function DatePickerFormFieldRender<T extends FieldValues>({
                                                              field,
                                                              fieldState,
                                                              formState,
                                                              name,       // non usati qui, ma lasciati per coerenza di props
                                                              control,    // idem
                                                              fullWidth,
                                                              textFieldProps,
                                                              disabled,
                                                              ...others
                                                          }: DatePickerFormFieldRenderProps<T>): ReactNode {
    const { error } = fieldState;
    const { value, onChange, onBlur, ref } = field;

    const rawValue = value as unknown;

    const normalizedValue =
        rawValue instanceof Date
            ? rawValue
            : rawValue
                ? new Date(rawValue as any)
                : null;

    const handleChange = (newValue: Date | null) => {
        onChange(newValue);
    };

    return (
        <DateTimePicker
            {...others}
            value={normalizedValue}
            onChange={handleChange}
            disabled={!!disabled || formState.isSubmitting}
            slotProps={{
                textField: {
                    fullWidth,
                    error: !!error,
                    helperText: !disabled ? error?.message : "",
                    inputRef: ref,
                    onBlur,
                    ...textFieldProps,
                },
            }}
        />
    );
}

export function DatePickerFormField<T extends FieldValues>({
                                                               name,
                                                               control,
                                                               ...others
                                                           }: DatePickerFormFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={(props) => (
                <DatePickerFormFieldRender
                    {...props}
                    name={name}
                    control={control}
                    {...others}
                />
            )}
        />
    );
}
