import {Box, Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import React from "react";

interface DialogComponentProps extends React.PropsWithChildren<any> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    actions?: Action[];
}

interface Action {
    label: string;
    onClick: () => void;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    sx?: any;
}

interface DialogComponentProps {
    action?: [{
        onClick: () => void;
        sx: { bgcolor: string; color: string; "&:hover": { bgcolor: string } };
        variant: string;
        disabled: false | true;
        label: string
    }, {
        onClick: (e?: React.BaseSyntheticEvent) => Promise<void>;
        sx: { bgcolor: string; color: string; "&:hover": { bgcolor: string } };
        variant: string;
        disabled: boolean;
        label: string
    }]
}

const DialogComponent: React.FC<DialogComponentProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             title,
                                                             subtitle,
                                                             children,
                                                             actions,
                                                         }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            scroll="body"
            fullWidth
            maxWidth="md"
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
                        color={action.color || "primary"}
                        variant={action.variant || "text"}
                        disabled={action.disabled}
                        sx={{borderRadius: '12px', ...action.sx}}
                    >
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent;