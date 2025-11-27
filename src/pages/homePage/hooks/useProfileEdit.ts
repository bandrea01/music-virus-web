import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {useNavigate} from "react-router-dom";
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {useAuth} from "@/components";
import {updateProfileRequest} from "../api/profile.ts";
import type {UpdateProfileDTO} from "../api/types.ts";

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
            navigate('/login', {replace: true});
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la modifica del profilo!")));
            console.error('Login error:', err);
        },
    });
}
