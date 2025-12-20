import {useAppDispatch} from "@store/hook.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import {useEffect} from "react";
import {setSnackbarError, setSnackbarSuccess} from "@store/snackbar/slice.ts";
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import {type EventListResponseDTO} from "@pages";
import {getEvents} from "@pages/homePage/api/event.ts";

export function useEventQuery<T>(options: {
    queryKey: readonly unknown[] | string;
    queryFn: () => Promise<T>;
    errorMessage: string;
    enabled?: boolean;
}) {
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
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch, options.errorMessage]);

    return {...query};
}

export function useEventMutation<TVariables, TData = void>(options: {
    mutationKey: readonly unknown[] | string;
    mutationFn: (variables: TVariables) => Promise<TData>;
    errorMessage: string;
    successMessage?: string;
    invalidateQueries?: (readonly unknown[] | string)[];
}) {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    return useMutation<TData, AxiosError, TVariables>({
        mutationKey: Array.isArray(options.mutationKey) ? options.mutationKey : [options.mutationKey],
        mutationFn: options.mutationFn,
        retry: 0,
        onSuccess: () => {
            if (options.successMessage) {
                dispatch(setSnackbarSuccess(options.successMessage));
            }

            if (options.invalidateQueries?.length) {
                options.invalidateQueries.forEach((key) => {
                    queryClient.invalidateQueries({
                        queryKey: Array.isArray(key) ? key : [key],
                    });
                });
            }
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, options.errorMessage)));
            console.error('Event mutation error:', err);
        },
    });
}

export function useGetEvents() {
    return useEventQuery<EventListResponseDTO>({
        queryKey: ['event'],
        queryFn: () => getEvents(),
        errorMessage: "Errore durante la richiesta della lista degli eventi!"
    });
}