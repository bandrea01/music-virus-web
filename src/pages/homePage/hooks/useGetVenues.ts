import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import type {VenueListResponseDTO} from "@pages/homePage/api/types.ts";
import {getVenuesList} from "@pages/homePage/api/profile.ts";

export function useGetVenues() {
    const dispatch = useAppDispatch();

    const query = useQuery<VenueListResponseDTO, AxiosError>({
        queryKey: ['venues'],
        queryFn: getVenuesList,
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
