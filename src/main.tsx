import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider, useQueryClient} from '@tanstack/react-query';
import App from './App';
import './styles/global.scss';
import {UIWrapper} from "@components/context/UIWrapper.tsx";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import 'leaflet/dist/leaflet.css';
import {AuthProvider} from "@components/context/AuthContext.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {it} from "date-fns/locale";
import {getArtistList, getVenuesList} from "@pages";
import {DOMAIN_FETCH_QUERY_WAIT_TIME} from "@utils/constant/constants.ts";

const qc = useQueryClient();

export const domainKeys = {
    artists: () => ['domain', 'artists'] as const,
    venues: () => ['domain', 'venues'] as const,
}

export function usePrefetchBaseDomain(enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        qc.prefetchQuery({
            queryKey: domainKeys.artists(),
            queryFn: getArtistList,
            staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
        }).then(() => {});

        qc.prefetchQuery({
            queryKey: domainKeys.venues(),
            queryFn: getVenuesList,
            staleTime: DOMAIN_FETCH_QUERY_WAIT_TIME,
        }).then(() => {});
    }, [qc, enabled]);
}

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
