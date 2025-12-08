import {Box, Checkbox, FormControlLabel} from "@mui/material";

export type CheckboxFilterOption<T extends string> = {
    value: T;
    label: string;
    checked: boolean;
};

export interface CheckboxFilterBarProps<T extends string> {
    options: CheckboxFilterOption<T>[];
    onChange: (value: T, checked: boolean) => void;
}

export function CheckboxFilterBar<T extends string>({
                                                        options,
                                                        onChange,
                                                    }: CheckboxFilterBarProps<T>) {
    return (
        <Box mb={2} display="flex" flexWrap="wrap" gap={2}>
            {options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    control={
                        <Checkbox
                            size="small"
                            checked={option.checked}
                            onChange={(_, checked) => onChange(option.value, checked)}
                        />
                    }
                    label={option.label}
                    sx={{color: 'white'}}
                />
            ))}
        </Box>
    );
}
