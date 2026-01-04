import {Alert, Snackbar, Typography} from "@mui/material";
import {type ReactElement} from "react";

export type SnackbarState = {
    open: boolean
    type: 'success' | 'error';
    message: string,
}

export type NotifyProps = SnackbarState & {
    onClose: () => void;
    duration?: number;
}

export default function SnackbarComponent({
                                                     open,
                                                     type,
                                                     message,
                                                     onClose,
                                                     duration,
                                                 }: NotifyProps): ReactElement | null {
    if (!type || !message) return null;
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