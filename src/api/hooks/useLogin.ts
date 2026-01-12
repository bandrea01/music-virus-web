import {useMutation, type UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {loginRequest} from '@pages/loginPage/api/auth.ts';
import type {JwtSessionResponseDTO, LoginDTO} from '@pages/loginPage/api/types.ts';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {useNavigate} from "react-router-dom";
import {getAxiosErrorMessage} from "@api/axios.ts";
import type {AxiosError} from "axios";
import {useAuth} from "@components";
import type {UserAuthRoleKey} from "@utils";
import {AppRoutes} from "@utils";
import type {ProfileResponseDTO} from "@pages";
import {profileRequest} from "@pages";
import type {IProfileUserLocalStorage} from "@components/providers/AuthContext.tsx";

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
                role: data.role as UserAuthRoleKey,
                jwt: data.jwt,
            })
            const profile = await queryClient.fetchQuery<ProfileResponseDTO>({
                queryKey: ['profile', data.userId],
                queryFn: () => profileRequest(),
                staleTime: 60_000,
            });
            if (profile) {
                setProfileUser(profile as IProfileUserLocalStorage);
            } else {
                dispatch(setSnackbarError("Errore nel caricamento del profilo!"));
                navigate(AppRoutes.LOGIN);
            }
            navigate(AppRoutes.MUSIC_VIRUS, {replace: true});
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante il login!")));
            console.error('Login error:', err);
        },
    });
}
