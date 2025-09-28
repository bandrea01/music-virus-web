import React, {type PropsWithChildren} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hook';
import {SnackbarComponent} from './SnackbarComponent';
import {resetSnackbar, selectSnackbarIsOpen} from "../store/snackbar/slice.ts";
import {useSelector} from "react-redux";

export const UIWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();

    //Singleton
    const open = useSelector(selectSnackbarIsOpen);
    const message = useAppSelector(state => state.snackbarReducer.message);
    const type = useAppSelector(state => state.snackbarReducer.type);

    return (
        <>
            {children}
            <SnackbarComponent
                open={open}
                type={type}
                message={message}
                onClose={() => dispatch(resetSnackbar())}
            />
        </>
    );
};
