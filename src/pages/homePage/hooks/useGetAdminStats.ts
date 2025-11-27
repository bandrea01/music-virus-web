import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import {getAdminStatistics} from "@pages/homePage/api/profile.ts";
import type {StatisticDTO} from "@pages/homePage/api/types.ts";

export function useGetAdminStats() {
    const dispatch = useAppDispatch();

    const query = useQuery<StatisticDTO, AxiosError>({
        queryKey: ['stats'],
        queryFn: getAdminStatistics,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta delle statistiche!")
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch]);

    return {...query}
}
