import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldPath,
    type FieldValues,
    type UseFormStateReturn,
} from "react-hook-form";
import {Box, Slider, type SliderProps, Typography,} from "@mui/material";
import {type ReactElement, type ReactNode, useCallback,} from "react";

type RenderFn<T extends FieldValues> = (props: FormFieldProps<T>) => ReactElement;

interface FormFieldProps<T extends FieldValues> {
    field: ControllerRenderProps<T>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<T>
}

export type SliderFormFieldProps<T extends FieldValues> =
    Omit<SliderProps, "name" | "value" | "onChange" | "defaultValue"> & {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    helperText?: ReactNode;
};

export type SliderFormFieldRenderProps<T extends FieldValues> =
    FormFieldProps<T> & SliderFormFieldProps<T>;

function SliderFormFieldRender<T extends FieldValues>({
                                                          field,
                                                          fieldState,
                                                          formState,
                                                          name,
                                                          control,
                                                          label,
                                                          helperText,
                                                          disabled,
                                                          ...sliderProps
                                                      }: SliderFormFieldRenderProps<T>): ReactNode {

    const { error } = fieldState;
    const { value, onChange } = field;

    // single value (es. targetAmount), non range
    const normalizedValue =
        typeof value === "number" ? value : (sliderProps.min as number | undefined) ?? 0;

    const handleChange = (_: Event, newValue: number | number[]) => {
        onChange(newValue);
    };

    const isDisabled = disabled || formState.isSubmitting;

    return (
        <Box sx={{ width: "100%" }}>
            {label && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                    }}
                >
                    <Typography variant="caption">
                        {label}
                    </Typography>
                    <Typography variant="caption">
                        {normalizedValue}
                    </Typography>
                </Box>
            )}

            <Slider
                {...sliderProps}
                value={normalizedValue}
                onChange={handleChange}
                disabled={isDisabled}
            />

            {(error?.message || helperText) && (
                <Typography
                    variant="caption"
                    sx={{ mt: 0.5 }}
                    color={error ? "error" : "textSecondary"}
                >
                    {error?.message ?? helperText}
                </Typography>
            )}
        </Box>
    );
}

export default function SliderFormField<T extends FieldValues>({
                                                           name,
                                                           control,
                                                           ...others
                                                       }: SliderFormFieldProps<T>) {

    const memoRender: RenderFn<T> = useCallback(
        (props) => (
            <SliderFormFieldRender
                {...props}
                name={name}
                control={control}
                {...others}
            />
        ),
        [control, name, others],
    );

    return <Controller control={control} name={name} render={memoRender} />;
}
