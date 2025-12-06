import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import type {ArtistListResponseDTO, VenueListResponseDTO} from "@pages/homePage/api/types.ts";
import {getAdminArtistsList, getAdminVenuesList} from "@pages";

export function useAdminDomain() {
    const dispatch = useAppDispatch();

    const query = useQuery<VenueListResponseDTO, AxiosError>({
        queryKey: ['venues'],
        queryFn: getAdminVenuesList,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta della lista di utenti!")
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch]);

    return {...query}
}

export function useAdminArtists() {
    const dispatch = useAppDispatch();

    const query = useQuery<ArtistListResponseDTO, AxiosError>({
        queryKey: ['artists'],
        queryFn: getAdminArtistsList,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta della lista di utenti!")
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch]);

    return {...query}
}
