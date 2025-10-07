import {Alert, Snackbar, Typography} from "@mui/material";
import React from "react";

export interface ISnackbarState {
    open: boolean
    type: 'success' | 'error';
    message: string,
}

export interface INotifyProps extends ISnackbarState {
    onClose: () => void;
    duration?: number;
}

export const SnackbarComponent: React.FC<INotifyProps> = ({
                                                     open,
                                                     type,
                                                     message,
                                                     onClose,
                                                     duration,
                                                 }: INotifyProps) => {
    if (!type || !message) return null;
    console.info("type: ", type, " message: ", message);
    return (
        <Snackbar
            onClose={onClose}
            open={open}
            message={message}
            autoHideDuration={duration || 3000}
            sx={{zIndex: 100000}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert
                elevation={5}
                variant="filled"
                onClose={onClose}
                severity={type}
            >
                <Typography variant="body2">{message}</Typography>
            </Alert>
        </Snackbar>
    )
}