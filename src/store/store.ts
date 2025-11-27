import {configureStore} from '@reduxjs/toolkit';
import snackbarReducer from './snackbar/slice.ts';
import sidebarReducer from './sidebar/slice.ts';

export const store = configureStore({
    reducer: {
        snackbarReducer,
        sidebarReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;