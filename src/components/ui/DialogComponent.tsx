import {Box, Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import React, {type ReactElement} from "react";

type DialogComponentProps = React.PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    actions?: Action[];
    maxWidth?: "sm" | "md" | "lg" | "xl" | false;
}>;

interface Action {
    label: string;
    onClick: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    sx?: Record<string, any>;
}

export default function DialogComponent({
                                            isOpen,
                                            onClose,
                                            title,
                                            subtitle,
                                            children,
                                            actions,
                                            maxWidth = "md",
                                        }: DialogComponentProps): ReactElement {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            scroll="body"
            fullWidth
            maxWidth={maxWidth}
            className="auth-form"
            slotProps={{
                paper: {className: "mv-dialog__paper"},
                backdrop: {className: "mv-dialog__backdrop"},
            }}
        >
            <Box className="mv-dialog__header">
                <div className="mv-dialog__titles">
                    <Typography className="mv-dialog__title">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography className="mv-dialog__subtitle">
                            {subtitle}
                        </Typography>
                    )}
                </div>
            </Box>

            <DialogContent className="mv-dialog__content">
                {children}
            </DialogContent>

            <DialogActions className="mv-dialog__actions">
                {actions?.map((action) => (
                    <Button
                        onClick={action.onClick}
                        disabled={action.disabled}
                    >
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

