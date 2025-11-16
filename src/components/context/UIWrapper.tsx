import React, {type PropsWithChildren} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hook.ts';
import {SnackbarComponent} from '../SnackbarComponent.tsx';
import {resetSnackbar, selectSnackbarIsOpen} from "@store/snackbar/slice.ts";
import {useSelector} from "react-redux";
import {PopupContextProvider} from "@components/context/PopupContextProvider.tsx";
import {PopupComponent} from "@components/PopupComponent.tsx";

export const UIWrapper: React.FC<PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch();

    //Singleton
    const open = useSelector(selectSnackbarIsOpen);
    const message = useAppSelector(state => state.snackbarReducer.message);
    const type = useAppSelector(state => state.snackbarReducer.type);

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
                onClose={() => dispatch(resetSnackbar())}
            />
        </>
    );
};
