import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {loginRequest} from '../api/auth';
import type {JwtSessionResponseDTO, LoginDTO} from '../api/types';
import {useAppDispatch} from '../store/hook';
import {setSnackbarError, setSnackbarSuccess} from '../store/snackbar/slice';
import {useNavigate} from "react-router-dom";
import {getAxiosErrorMessage} from "../api/axios.ts";
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
