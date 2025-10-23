import {useMutation} from '@tanstack/react-query';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {useNavigate} from 'react-router-dom';
import type {UserTypeId} from '@/pages';
import {registerRequest} from './register.ts';
import type {AxiosError} from "axios";
import {getAxiosErrorMessage} from "@/apiService/axios.ts";

export function useUserRegisterUser(userType: UserTypeId) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['register', userType],
        mutationFn: async (payload: any) => {
            return registerRequest(userType as any, payload);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Registrazione effettuata!\n Effettua il login'));
            navigate('/login');
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la registrazione!")));
            console.error('Register error:', err);
        },
    });
}
