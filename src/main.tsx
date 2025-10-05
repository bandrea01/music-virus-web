import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App';
import './styles/global.scss';
import {UIWrapper} from "./components/UIWrapper.tsx";
import {store} from "./store/store.ts";
import {Provider} from "react-redux";
import 'leaflet/dist/leaflet.css';

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={qc}>
                <BrowserRouter>
                    <UIWrapper>
                        <App/>
                    </UIWrapper>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
