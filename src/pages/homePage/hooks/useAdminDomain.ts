import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import type {
    ArtistListResponseDTO,
    FanListResponseDTO,
    StatisticDTO,
    VenueListResponseDTO
} from "@pages/homePage/api/types.ts";
import {
    approveArtist,
    banUser,
    getAdminArtistsList,
    getAdminFansList,
    getAdminStatistics,
    getAdminVenuesList,
    unapproveArtist,
    unbanUser
} from "@pages";

export function useAdminQuery<T>(options: {
    queryKey: readonly unknown[] | string;
    queryFn: () => Promise<T>;
    errorMessage: string;
    enabled?: boolean;
}) {
    const dispatch = useAppDispatch();

    const query = useQuery<T, AxiosError>({
        queryKey: Array.isArray(options.queryKey) ? options.queryKey : [options.queryKey],
        queryFn: options.queryFn,
        retry: 0,
        enabled: options.enabled ?? true,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, options.errorMessage)
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch, options.errorMessage]);

    return {...query};
}

export function useAdminMutation<TVariables, TData = void>(options: {
    mutationFn: (variables: TVariables) => Promise<TData>;
    errorMessage: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
}) {
    const dispatch = useAppDispatch();

    return useMutation<TData, AxiosError, TVariables>({
        mutationFn: options.mutationFn,
        retry: 0,
        onError: (error) => {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(error, options.errorMessage)
                )
            );
            console.error('Request error:', error);
        },
        onSuccess: (data, variables) => {
            options.onSuccess?.(data, variables);
        },
    });
}

export function useAdminVenues() {
    return useAdminQuery<VenueListResponseDTO>({
        queryKey: ['venues'],
        queryFn: getAdminVenuesList,
        errorMessage: "Errore durante la richiesta della lista esercenti!"
    });
}

export function useAdminArtists() {
    return useAdminQuery<ArtistListResponseDTO>({
        queryKey: ['artists'],
        queryFn: getAdminArtistsList,
        errorMessage: "Errore durante la richiesta della lista di utenti!"
    });
}

export function useAdminFans() {
    return useAdminQuery<FanListResponseDTO>({
        queryKey: ['fans'],
        queryFn: getAdminFansList,
        errorMessage: "Errore durante la richiesta della lista di utenti!"
    });
}

export function useAdminStats() {
    return useAdminQuery<StatisticDTO>({
        queryKey: ['stats'],
        queryFn: getAdminStatistics,
        errorMessage: "Errore durante la richiesta delle statistiche!"
    });
}

export function useAdminApproveArtist() {
    const queryClient = useQueryClient();

    return useAdminMutation<string>({
        mutationFn: (artistId) => approveArtist(artistId),
        errorMessage: "Errore durante l'approvazione dell'artista!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['artists']});
        }
    });
}

export function useAdminUnapproveArtist() {
    const queryClient = useQueryClient();

    return useAdminMutation<string>({
        mutationFn: (artistId) => unapproveArtist(artistId),
        errorMessage: "Errore durante la revoca dell'approvazione dell'artista!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['artists']});
        }
    });
}

export function useAdminBanUser() {
    const queryClient = useQueryClient();

    return useAdminMutation<string>({
        mutationFn: (userId) => banUser(userId),
        errorMessage: "Errore durante il ban dell'utente!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['artists']});
        }
    });
}

export function useAdminUnbanUser() {
    const queryClient = useQueryClient();

    return useAdminMutation<string>({
        mutationFn: (userId) => unbanUser(userId),
        errorMessage: "Errore durante l'abilitazione dell'utente!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['artists']});
        }
    });
}
