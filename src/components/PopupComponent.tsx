import {Box, Button, Dialog, DialogActions, DialogContent, Typography} from "@mui/material";
import {type ReactNode, useContext} from "react";
import {PopupContext} from "@components/context/PopupContextProvider.tsx";

export const PopupComponent = () => {
    const {
        isPopupOpen,
        title,
        message,
        children,
        onCancelFn,
        onConfirmFn,
        closePopup,
        confirmLabel,
        confirmButtonVariant,
        confirmButtonDisabled,
        cancelLabel,
        cancelButtonVariant,
    } = useContext(PopupContext);

    // @ts-ignore
    const handleClose = (
        _: unknown,
        reason: "backdropClick" | "escapeKeyDown" | "cancel-btn"
    ) => {
        let cancelled = false;
        if (onCancelFn) {
            // @ts-ignore
            const res = onCancelFn(reason);
            if (typeof res === "boolean" && !res) {
                cancelled = true;
            }
        }
        if (!cancelled) {
            closePopup();
        }
    }

    const handleConfirm = () => {
        closePopup();
        if (onConfirmFn) onConfirmFn();
    }

    if (!isPopupOpen) return null;

    const actions = [
        {
            onClick: handleConfirm,
            label: confirmLabel || "Conferma",
            variant: confirmButtonVariant || "contained",
            disabled: confirmButtonDisabled || false,
            type: "submit",
        }
    ];

    if (onCancelFn || cancelLabel) {
        actions.unshift({
            onClick: () => handleClose({}, "cancel-btn"),
            label: cancelLabel || "Annulla",
            variant: cancelButtonVariant || "text",
            disabled: false,
            type: ""
        })
    }

    const getContent = () => {
        const contentArray: ReactNode[] = [];

        if (message) {
            contentArray.push(
                <DialogContent key="dialog-content">
                    <Typography>
                        {message}
                    </Typography>
                </DialogContent>
            );
        }

        if (children) {
            contentArray.push(children);
        }

        return contentArray.length > 0 ? contentArray : null;
    }

    return (
        <Dialog
            onClose={handleClose}
            open={isPopupOpen}
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
                </div>
            </Box>
            <DialogContent className="mv-dialog__content">
                {getContent()}
            </DialogContent>
            <DialogActions className="mv-dialog__actions">
                {actions.map(
                    (action, index) => (
                        <Button
                            key={`dialog-action-btn-${index}`}
                            onClick={action.onClick}
                            variant={action.variant as "text" | "contained" | "outlined"}
                            disabled={action.disabled}
                            type={action.type as "button" | "submit" | "reset" | undefined}
                        >
                            {action.label}
                        </Button>
                    )
                )}
            </DialogActions>
        </Dialog>
    )
}