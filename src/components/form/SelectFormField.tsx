import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    type UseFormStateReturn
} from "react-hook-form";
import {MenuItem, type SelectChangeEvent, TextField, type TextFieldProps, Typography} from "@mui/material";
import React, {type ReactElement, type ReactNode, useCallback} from "react";

export type SelectProps = Omit<TextFieldProps, "select">
export type RenderFn<T extends FieldValues> = (props: FormFieldProps<T>) => ReactElement
export type SelectMenuItem = {
    label: string
    value: string | number
    key?: number
}
export type SelectFormFieldProps<T extends FieldValues> =
    Omit<SelectProps, "name" | "value" | "onChange" | "onBlur" | "inputRef" | "children"> & {
    name: FieldPath<T>;
    control: Control<T>;
    menuItems: SelectMenuItem[];
    label?: string;
    multiple?: boolean;
    renderValue?: (selected: unknown) => ReactNode;
};

export type SelectFormFieldRenderProps<T extends FieldValues> = FormFieldProps<T> & SelectFormFieldProps<T>

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<T>
}

export function getSelectOptions(menuItems: string[]) {
    return menuItems.map((item: string) => ({
        key: Number(menuItems.indexOf(item)),
        label: item,
        value: item
    }));
}

export const FormSelect: React.FC<SelectProps> = ({
                                                      variant = "outlined",
                                                      helperText,
                                                      ...props
                                                  }) => (
    <TextField {...props} variant={variant} select helperText={helperText}/>
);

function SelectFormFieldRender<T extends FieldValues>({
                                                          fullWidth,
                                                          sx,
                                                          disabled,
                                                          field,
                                                          fieldState,
                                                          formState,
                                                          multiple,
                                                          menuItems,
                                                          renderValue,
                                                          ...others
                                                      }: SelectFormFieldRenderProps<T>): ReactNode {

    const {error} = fieldState;
    const {onChange, value, onBlur, ref} = field;

    const isMultiple = !!multiple;

    const normalizedValue = isMultiple
        ? (Array.isArray(value) ? value : [])
        : (value ?? '');

    const handleChange = useCallback(
        (e: SelectChangeEvent<any>) => {
            const v = e.target.value;
            const next = Array.isArray(v) ? v : String(v).split(",");
            onChange(isMultiple ? next : (v ?? ""));
        },
        [isMultiple, onChange]
    );

    // @ts-ignore
    return (
        <FormSelect
            {...others}
            sx={{
                '& input': {
                    textTransform: 'uppercase'
                },
                ...sx
            }}
            inputRef={ref}
            disabled={disabled || formState.isSubmitting}
            error={!!error}
            helperText={!disabled ? error?.message : ''}
            value={normalizedValue as any ?? ''}
            // @ts-ignore
            onChange={handleChange}
            onBlur={onBlur}
            SelectProps={{
                multiple: isMultiple,
                renderValue
            }}
        >
            {menuItems.map(({key, value, label}) => (
                <MenuItem key={key ?? label} value={value}>
                    <Typography variant="caption">{label}</Typography>
                </MenuItem>
            ))}
        </FormSelect>
    )
}

export default function SelectFormField<T extends FieldValues>({
                                                           name,
                                                           control,
                                                           ...others
                                                       }: SelectFormFieldProps<T>) {

    const memoRender: RenderFn<T> = useCallback(
        (props) => (
            <SelectFormFieldRender
                {...props}
                name={name}
                control={control}
                {...others}
            />
        ), [control, name, others]
    );

    return <Controller control={control} name={name} render={memoRender}/>;
}