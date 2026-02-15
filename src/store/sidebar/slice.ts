import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {AppRoutes} from "@utils";

export interface ISidebarState {
    activeTab: string;
}

const initialState: ISidebarState = {
    activeTab: AppRoutes.SECTION.EVENT,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload;
        },
    },
});

export const { setActiveTab } = sidebarSlice.actions;

// Selectors
export const selectActiveTab = (state: { sidebarReducer: ISidebarState }) =>
    state.sidebarReducer.activeTab;

export default sidebarSlice.reducer;
