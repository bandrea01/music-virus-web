import React from "react";

export type ActionProps = {
    label: string;
    onClick: () => void;
    startIcon?: React.ReactNode;
    disabled?: boolean;
};