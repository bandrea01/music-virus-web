import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    type UseFormStateReturn
} from "react-hook-form";
import {TextField, type TextFieldProps} from "@mui/material";
import React, {type ReactElement, type ReactNode, useCallback} from "react";

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<T>
}

export type TextForFieldInputType = 'NumericType' | 'UppercaseType'

export type TextFormFieldProps<T extends FieldValues> = TextFieldProps & {
    name: FieldPath<T>
    control: Control<T>
    inputType?: TextForFieldInputType
    textArea?: boolean
}

type TextFormFieldRenderProps<T extends FieldValues> = FormFieldProps<T> & TextFormFieldProps<T>

function TextFormFieldRender<T extends FieldValues>({
                                                        fullWidth,
                                                        sx,
                                                        disabled,
                                                        field,
                                                        fieldState,
                                                        inputType,
                                                        textArea,
                                                        formState,
                                                        ...others
                                                    }: TextFormFieldRenderProps<T>): ReactNode {

    const {error} = fieldState;
    const {onChange, value, onBlur, ref} = field;
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
        useCallback(
            (e) => {
                if (inputType === 'NumericType') {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    onChange(numericValue);
                    return;
                }
                if (inputType === 'UppercaseType') {
                    const upperCaseValue = e.target.value.toUpperCase();
                    onChange(upperCaseValue);
                    return;
                }
                onChange(e);
            }, [inputType, onChange]
        )

    return (
        <TextField
            {...others}
            sx={{
                '& input': {
                    textTransform: inputType === 'UppercaseType' ? 'uppercase' : undefined
                },
                ...sx
            }}
            inputRef={ref}
            disabled={disabled || formState.isSubmitting}
            error={!!error}
            helperText={!disabled ? error?.message : ''}
            value={value ?? ''}
            onChange={handleChange}
            onBlur={onBlur}
            multiline={textArea}
            rows={textArea ? 10 : undefined}
        />
    )
}

export function TextFormField<T extends FieldValues>({
                                                         name,
                                                         control,
                                                         ...others
                                                     }: TextFormFieldProps<T>) {

    const memoRender: ({
                           field,
                           fieldState,
                           formState
                       }: {
        field: ControllerRenderProps<T>
        fieldState: ControllerFieldState
        formState: UseFormStateReturn<T>
    }) => ReactElement = useCallback(
        ({field, fieldState, formState}) => (
            <TextFormFieldRender
                field={field}
                fieldState={fieldState}
                formState={formState}
                name={name}
                control={control}
                {...others}
            />
        ), [control, name, others]
    );

    return <Controller control={control} name={name} render={memoRender}/>;
}

