import React, {type PropsWithChildren} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {SnackbarComponent} from '@/components';
import {resetSnackbar, selectSnackbarIsOpen, selectSnackbarMessage, selectSnackbarType} from "@store/snackbar/slice.ts";
import {useSelector} from "react-redux";
import {PopupContextProvider} from "@components/context/PopupContextProvider.tsx";
import {PopupComponent} from "@components/PopupComponent.tsx";

export const UIWrapper: React.FC<PropsWithChildren> = ({children}) => {
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
