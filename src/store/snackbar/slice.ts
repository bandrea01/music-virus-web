import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TSnackbarActionType} from "./snackbarActionTypesEnum.ts";

export interface ISnackbarState {
    type: 'success' | 'error';
    open: boolean;
    message: string;
}

const initialState: ISnackbarState = {
    type: 'success',
    open: false,
    message: '',
}

type TSnackbarPayload = {
    message: string;
}

const slice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        setSnackbarSuccess: (state, action: PayloadAction<TSnackbarPayload | string, TSnackbarActionType[0]>) => {
            state.type = 'success';
            state.open = true;
            state.message = action.payload.toString();
        },
        setSnackbarError: (state, action: PayloadAction<TSnackbarPayload | string, TSnackbarActionType[0]>) => {
            state.type = 'error';
            state.open = true;
            state.message = action.payload.toString();
        },
        resetSnackbar: (state) => {
            state.open = false;
            state.message = '';
        },
    },
});

export const { setSnackbarSuccess, setSnackbarError, resetSnackbar } = slice.actions;

// Selectors
export const selectSnackbarIsOpen = (state: { snackbarReducer: ISnackbarState }) => state.snackbarReducer.open;
export const selectSnackbarMessage = (state: { snackbarReducer: ISnackbarState }) => state.snackbarReducer.message;
export const selectSnackbarType = (state: { snackbarReducer: ISnackbarState }) => state.snackbarReducer.type;

export default slice.reducer;