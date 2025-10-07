import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {loginRequest} from './auth.ts';
import type {JwtSessionResponseDTO, LoginDTO} from '../../../axios/types.ts';
import {useAppDispatch} from '../../../store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '../../../store/snackbar/slice.ts';
import {useNavigate} from "react-router-dom";
import {getAxiosErrorMessage} from "../../../axios/axios.ts";
import type {AxiosError} from "axios";

export function useLogin(): UseMutationResult<JwtSessionResponseDTO, unknown, LoginDTO, unknown> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (payload) => {
            return await loginRequest(payload);
        },
        retry: 0,
        onSuccess: (data) => {
            dispatch(setSnackbarSuccess('Login effettuato'));
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('userId', data.userId);
            navigate('/homepage');
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante il login!")));
            console.error('Login error:', err);
        },
    });
}
