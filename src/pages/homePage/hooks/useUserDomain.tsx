import {
    useMutation,
    type UseMutationResult,
    useQuery,
    type UseQueryResult
} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {
    getArtistList,
    getFansList,
    getVenuesList,
    updateProfileRequest
} from "@pages/homePage/api/profile.ts";
import type {
    ArtistListResponseDTO,
    FanListResponseDTO,
    UpdateProfileDTO,
    VenueListResponseDTO
} from "@pages/homePage/api/types.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@components";
import {MusicVirusRoutesEnum} from "@utils";

function useProfileQuery<T>(options: {
    queryKey: readonly unknown[] | string;
    queryFn: () => Promise<T>;
    errorMessage: string;
    enabled?: boolean;
}): UseQueryResult<T, AxiosError> {
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
        }
    }, [query.error, dispatch, options.errorMessage]);

    return query;
}

function useProfileMutation<TVariables, TData = unknown>(options: {
    mutationKey: readonly unknown[] | string;
    mutationFn: (variables: TVariables) => Promise<TData>;
    errorMessage: string;
    successMessage?: string;
    onSuccessExtra?: (data: TData, variables: TVariables) => void;
}): UseMutationResult<TData, AxiosError, TVariables, unknown> {
    const dispatch = useAppDispatch();

    return useMutation<TData, AxiosError, TVariables>({
        mutationKey: Array.isArray(options.mutationKey) ? options.mutationKey : [options.mutationKey],
        mutationFn: options.mutationFn,
        retry: 0,
        onSuccess: (data, variables) => {
            if (options.successMessage) {
                dispatch(setSnackbarSuccess(options.successMessage));
            }
            options.onSuccessExtra?.(data, variables);
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, options.errorMessage)));
            console.error('Profile mutation error:', err);
        },
    });
}

export function useGetFans(): UseQueryResult<FanListResponseDTO, AxiosError> {
    return useProfileQuery<FanListResponseDTO>({
        queryKey: ['fans'],
        queryFn: getFansList,
        errorMessage: "Errore durante la richiesta della lista dei fans!"
    });
}

export function useGetArtists(): UseQueryResult<ArtistListResponseDTO, AxiosError> {
    return useProfileQuery<ArtistListResponseDTO>({
        queryKey: ['artists'],
        queryFn: getArtistList,
        errorMessage: "Errore durante la richiesta della lista di artisti!"
    });
}

export function useGetVenues(): UseQueryResult<VenueListResponseDTO, AxiosError> {
    return useProfileQuery<VenueListResponseDTO>({
        queryKey: ['venues'],
        queryFn: getVenuesList,
        errorMessage: "Errore durante la richiesta della lista dei locali!"
    });
}

export function useProfileEdit(): UseMutationResult<unknown, AxiosError, UpdateProfileDTO, unknown> {
    const navigate = useNavigate();
    const {logout} = useAuth();

    return useProfileMutation<UpdateProfileDTO>({
        mutationKey: ['profile-edit'],
        mutationFn: (payload) => updateProfileRequest(payload),
        errorMessage: "Errore durante la modifica del profilo!",
        successMessage: "Profilo modificato con successo! Effettua nuovamente il login",
        onSuccessExtra: () => {
            logout();
            navigate(MusicVirusRoutesEnum.LOGIN, {replace: true});
        },
    });
}
