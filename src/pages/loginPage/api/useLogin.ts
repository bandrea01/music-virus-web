import {useMutation, type UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {loginRequest} from './auth.ts';
import type {JwtSessionResponseDTO, LoginDTO} from './types.ts';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {useNavigate} from "react-router-dom";
import {getAxiosErrorMessage} from "@/apiService/axios.ts";
import type {AxiosError} from "axios";
import {type AuthRole, type IUserProfile, useAuth} from "@/components";
import {profileRequest} from "@pages";
import type {ProfileResponseDTO} from "@pages";
import {MusicVirusRoutesEnum} from "@/utils";

export function useLogin(): UseMutationResult<JwtSessionResponseDTO, unknown, LoginDTO, unknown> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {setAuthUser, setProfileUser} = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (payload) => {
            return await loginRequest(payload);
        },
        retry: 0,
        onSuccess: async (data) => {
            dispatch(setSnackbarSuccess('Login effettuato'));
            //Update context
            setAuthUser({
                userId: data.userId,
                role: data.role as AuthRole,
                jwt: data.jwt,
            })
            const profile = await queryClient.fetchQuery<ProfileResponseDTO>({
                queryKey: ['profile', data.userId],
                queryFn: () => profileRequest(),
                staleTime: 60_000, // opzionale: 1 min “fresh”
            });
            if (profile) {
                setProfileUser(profile as IUserProfile);
            } else {
                dispatch(setSnackbarError("Errore nel caricamento del profilo!"));
                navigate(MusicVirusRoutesEnum.LOGIN);
            }
            navigate(MusicVirusRoutesEnum.MUSIC_VIRUS, {replace: true});
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante il login!")));
            console.error('Login error:', err);
        },
    });
}
