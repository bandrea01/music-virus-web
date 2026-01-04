import {type ReactElement, type ReactNode, useCallback, useMemo} from "react";
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
    type CheckboxProps,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@mui/material";
import type {SxProps, Theme} from "@mui/material/styles";

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
}

export type CheckboxGroupOption = {
    value: string;
    label: ReactNode;
    disabled?: boolean;
};

export type CheckboxGroupFormFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    label?: ReactNode;
    helperText?: ReactNode;
    options: CheckboxGroupOption[];
    row?: boolean;
    required?: boolean;
    sx?: SxProps<Theme>;        // stile sul FormControl
    checkboxProps?: Omit<CheckboxProps, "checked" | "onChange">; // props comuni a tutte le checkbox
};

type CheckboxGroupFormFieldRenderProps<T extends FieldValues> =
    FormFieldProps<T> & CheckboxGroupFormFieldProps<T>;

function CheckboxGroupFormFieldRender<T extends FieldValues>({
                                                                 field,
                                                                 fieldState,
                                                                 formState,
                                                                 label,
                                                                 helperText,
                                                                 options,
                                                                 row = false,
                                                                 required = false,
                                                                 sx,
                                                                 checkboxProps,
                                                             }: CheckboxGroupFormFieldRenderProps<T>): ReactNode {
    const { error } = fieldState;
    const { value, onChange } = field;

    const selected = useMemo<string[]>(
        () => (Array.isArray(value) ? (value as string[]) : []),
        [value]
    );

    const toggle = useCallback(
        (optValue: string, checked: boolean) => {
            const next = checked
                ? Array.from(new Set([...selected, optValue]))
                : selected.filter((x) => x !== optValue);

            onChange(next);
        },
        [onChange, selected]
    );

    return (
        <FormControl
            component="fieldset"
            variant="standard"
            error={!!error}
            disabled={formState.isSubmitting}
            sx={sx}
        >
            {label && (
                <FormLabel component="legend" sx={{color: '#fafafa !important'}}>
                    {label}
                    {required ? " *" : ""}
                </FormLabel>
            )}

            <FormGroup row={row}>
                {options.map((opt) => {
                    const checked = selected.includes(opt.value);
                    return (
                        <FormControlLabel
                            key={opt.value}
                            label={opt.label}
                            disabled={opt.disabled}
                            control={
                                <Checkbox
                                    {...checkboxProps}
                                    checked={checked}
                                    onChange={(e) => toggle(opt.value, e.target.checked)}
                                    sx={{color: '#fafafa'}}
                                />
                            }
                            sx={{color: '#fafafa'}}
                        />
                    );
                })}
            </FormGroup>

            {(error?.message || helperText) && (
                <FormHelperText>{error?.message ?? helperText}</FormHelperText>
            )}
        </FormControl>
    );
}

export default function CheckboxGroupFormField<T extends FieldValues>({
                                                                          name,
                                                                          control,
                                                                          required,
                                                                          ...others
                                                                      }: CheckboxGroupFormFieldProps<T>): ReactElement {
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
            <CheckboxGroupFormFieldRender
                field={field}
                fieldState={fieldState}
                formState={formState}
                name={name}
                control={control}
                required={required}
                {...others}
            />
        ),
        [control, name, others, required]
    );

    return (
        <Controller
            control={control}
            name={name}
            rules={
                required
                    ? {
                        validate: (v) =>
                            (Array.isArray(v) && v.length > 0) || "Seleziona almeno un'opzione",
                    }
                    : undefined
            }
            render={memoRender}
        />
    );
}
