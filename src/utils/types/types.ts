import type React from "react";

export const FeePeriodEnum = {
    DAILY: "Giornaliera",
    WEEKLY: "Settimanale",
    MONTHLY: "Mensile",
    YEARLY: "Annuale",
} as const;
export type FeePlanPeriodKey = keyof typeof FeePeriodEnum;

export type DropdownOption = {
    value: string;
    label: string;
    startIcon?: React.ReactNode;
    disabled?: boolean;
};

export type ActionProps =
    | {
    label: string;
    startIcon?: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
    dropdown?: never;
    onSelect?: never;
}
    | {
    label: string;
    startIcon?: React.ReactNode;
    disabled?: boolean;
    dropdown: DropdownOption[];
    onSelect: (value: DropdownOption["value"], option: DropdownOption) => void;
    onClick?: never;
};
