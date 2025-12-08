import {useMutation, type UseMutationResult, useQuery, type UseQueryResult} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {getArtistList, getFansList, getVenuesList, updateProfileRequest} from "@pages/homePage/api/profile.ts";
import type {
    ArtistListResponseDTO,
    FanListResponseDTO,
    UpdateProfileDTO,
    VenueListResponseDTO
} from "@pages/homePage/api/types.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@components";
import {MusicVirusRoutesEnum} from "@utils";

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

export function useProfileEdit(): UseMutationResult<unknown, unknown, UpdateProfileDTO, unknown> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {logout} = useAuth();

    return useMutation({
        mutationKey: ['profile-edit'],
        mutationFn: async (payload) => {
            return await updateProfileRequest(payload);
        },
        retry: 0,
        onSuccess: async () => {
            dispatch(setSnackbarSuccess('Profilo modificato con successo! Effettua nuovamente il login'));
            logout();
            navigate(MusicVirusRoutesEnum.LOGIN, {replace: true});
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la modifica del profilo!")));
            console.error('Login error:', err);
        },
    });
}
