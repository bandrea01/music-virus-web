import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {getArtistList} from "@pages/homePage/api/profile.ts";
import type {ArtistListResponseDTO} from "@pages/homePage/api/types.ts";

export function useGetArtists() {
    const dispatch = useAppDispatch();

    const query = useQuery<ArtistListResponseDTO, AxiosError>({
        queryKey: ['artists'],
        queryFn: getArtistList,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta della lista di artisti!")
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch]);

    return {...query}
}
