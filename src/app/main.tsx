import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App.tsx';
import '@styles/global.scss';
import {store} from "@store/store.ts";
import {Provider} from "react-redux";
import 'leaflet/dist/leaflet.css';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {it} from "date-fns/locale";
import {AuthProvider, UIWrapper} from "@components";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
            <AuthProvider>
                <Provider store={store}>
                    <QueryClientProvider client={qc}>
                        <UIWrapper>
                            <App/>
                        </UIWrapper>
                    </QueryClientProvider>
                </Provider>
            </AuthProvider>
        </LocalizationProvider>
    </React.StrictMode>
);
