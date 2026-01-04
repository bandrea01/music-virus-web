import {type Control, Controller, type FieldPath, type FieldValues,} from "react-hook-form";
import {type TextFieldProps} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

type CommonProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    fullWidth?: boolean;
    textFieldProps?: Omit<TextFieldProps, "value" | "onChange">;
    withTime?: boolean;
};

type DatePickerFormFieldProps<T extends FieldValues> =
    CommonProps<T> &
    (
        Omit<any, "value" | "onChange" | "slotProps"> // DateTimePicker props
        );

export default function DatePickerFormField<T extends FieldValues>({
                                                                       name,
                                                                       control,
                                                                       fullWidth,
                                                                       textFieldProps,
                                                                       withTime = true,
                                                                       disabled,
                                                                       ...others
                                                                   }: DatePickerFormFieldProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState, formState }) => {
                const raw = field.value as any;

                const normalizedValue =
                    raw == null || raw === ""
                        ? null
                        : raw instanceof Date
                            ? raw
                            : new Date(raw);

                const commonSlotProps = {
                    textField: {
                        fullWidth,
                        error: !!fieldState.error,
                        helperText: !disabled ? fieldState.error?.message : "",
                        inputRef: field.ref,
                        onBlur: field.onBlur,
                        ...textFieldProps,
                    },
                } as const;

                const isDisabled = !!disabled || formState.isSubmitting;

                if (withTime) {
                    return (
                        <DateTimePicker
                            {...(others as any)}
                            value={normalizedValue}
                            onChange={(v: any) => field.onChange(v)}
                            disabled={isDisabled}
                            slotProps={commonSlotProps}
                        />
                    );
                }

                return (
                    <DatePicker
                        {...(others as any)}
                        value={normalizedValue}
                        onChange={(v: any) => field.onChange(v)}
                        disabled={isDisabled}
                        slotProps={commonSlotProps}
                    />
                );
            }}
        />
    );
}
