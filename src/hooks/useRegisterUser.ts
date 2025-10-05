import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import type {RegisterDTO} from '../api/types';
import {useAppDispatch} from '../store/hook';
import {setSnackbarError, setSnackbarSuccess} from '../store/snackbar/slice';
import {useNavigate} from "react-router-dom";
import type {UserTypeId} from "../pages";
import {registerRequest} from "../api/register.ts";

export function useRegisterUser(userType: UserTypeId): UseMutationResult<unknown, unknown, RegisterDTO, unknown> {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['register'],
        mutationFn: async (payload) => {
            return await registerRequest(payload, userType);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Registrazione effettuata!\n Effettua il login'));
            navigate('/login');
        },
        onError: (err) => {
            dispatch(setSnackbarError("Errore:\n todo",));
            console.error('Login error:', err);
        },
    });
}
