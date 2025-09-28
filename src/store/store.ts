import {configureStore} from '@reduxjs/toolkit';
import snackbarReducer from './snackbar/slice.ts';

export const store = configureStore({
    reducer: {
        snackbarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;