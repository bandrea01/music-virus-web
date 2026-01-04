import {type PropsWithChildren, type ReactElement} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {PopupComponent, PopupContextProvider, SnackbarComponent} from '@components';
import {resetSnackbar, selectSnackbarIsOpen, selectSnackbarMessage, selectSnackbarType} from "@store/snackbar/slice.ts";
import {useSelector} from "react-redux";

export default function UIWrapper({children}: PropsWithChildren<{}>): ReactElement {
    const dispatch = useAppDispatch();

    //Singleton
    const open = useSelector(selectSnackbarIsOpen);
    const message = useSelector(selectSnackbarMessage);
    const type = useSelector(selectSnackbarType);

    return (
        <>
            <PopupContextProvider>
                {children}
                <PopupComponent/>
            </PopupContextProvider>
            <SnackbarComponent
                open={open}
                type={type}
                message={message}
                duration={5000}
                onClose={() => dispatch(resetSnackbar())}
            />
        </>
    );
};
