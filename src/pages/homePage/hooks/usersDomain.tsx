import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {getArtistList, getFansList, getVenuesList} from "@pages/homePage/api/profile.ts";
import type {ArtistListResponseDTO, FanListResponseDTO, VenueListResponseDTO} from "@pages/homePage/api/types.ts";

function useUsersByRole<T>(
    key: string,
    queryFn: () => Promise<T>,
    messageError: string
): UseQueryResult<T, AxiosError> {
    const dispatch = useAppDispatch();

    const query = useQuery<T, AxiosError>({
        queryKey: [key],
        queryFn,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, messageError)
                )
            );
        }
    }, [query.error, dispatch, messageError]);

    return query;
}

export function useGetFans(): UseQueryResult<FanListResponseDTO, AxiosError> {
    return useUsersByRole<FanListResponseDTO>(
        'fans',
        () => getFansList(),
        "Errore durante la richiesta della lista dei fans!"
    );
}

export function useGetArtists(): UseQueryResult<ArtistListResponseDTO, AxiosError> {
    return useUsersByRole<ArtistListResponseDTO>(
        'artists',
        () => getArtistList(),
        "Errore durante la richiesta della lista di artisti!"
    );
}

export function useGetVenues(): UseQueryResult<VenueListResponseDTO, AxiosError> {
    return useUsersByRole<VenueListResponseDTO>(
        'venues',
        () => getVenuesList(),
        "Errore durante la richiesta della lista dei locali!"
    );
}
