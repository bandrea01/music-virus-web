import {createSlice} from "@reduxjs/toolkit";
import type {Fundraising} from "@pages";

export interface IDialogState {
    isDialogOpen: boolean;
    isEditMode: boolean;
    fundraising?: Fundraising;
}

const initialState: IDialogState = {
    isDialogOpen: false,
    isEditMode: false,
    fundraising: undefined,
};

const fundraisingDialogSlice = createSlice({
    name: 'fundraisingDialog',
    initialState,
    reducers: {
        setFundraisingDialogOpen: (state) => {
            state.isDialogOpen = true;
        },
        setFundraisingDialogClose: (state) => {
            state.isDialogOpen = false;
            state.fundraising = undefined;
        },
        setEditMode: (state, action) => {
            state.isEditMode = action.payload;
        },
        setFundraising: (state, action) => {
            state.fundraising = action.payload;
        },
    },
});

export const { setFundraisingDialogOpen, setFundraisingDialogClose, setFundraising, setEditMode } = fundraisingDialogSlice.actions;

// Selectors
export const selectIsDialogOpen = (state: { dialogReducer: IDialogState }) =>
    state.dialogReducer.isDialogOpen;
export const selectFundraising = (state: { dialogReducer: IDialogState }) =>
    state.dialogReducer.fundraising;
export const selectIsEditMode = (state: { dialogReducer: IDialogState }) =>
    state.dialogReducer.isEditMode;

export default fundraisingDialogSlice.reducer;
