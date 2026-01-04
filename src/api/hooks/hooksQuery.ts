import {useAppDispatch} from "@store/hook.ts";
import {type QueryKey, useMutation, useQuery, type UseQueryOptions, type UseQueryResult} from "@tanstack/react-query";
import type {AxiosError} from "axios";
import {useEffect} from "react";
import {setSnackbarError, setSnackbarSuccess} from "@store/snackbar/slice.ts";
import {getAxiosErrorMessage} from "@api/axios.ts";

export type THookQueryProps<TQueryFnData, TData = TQueryFnData> = {
    queryKey: QueryKey;
    queryFn: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>["queryFn"];
    enabled?: boolean;
    errorMessage?: string;
    retry?: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>["retry"];
    staleTime?: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>["staleTime"];
    select?: UseQueryOptions<TQueryFnData, AxiosError, TData, QueryKey>["select"];
};
export type THookMutationProps<TVariables, TData> = {
    mutationFn: (variables: TVariables) => Promise<TData>;
    errorMessage: string;
    successMessage?: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
}

/**
 * useHookQuery is a custom hook that wraps around React Query's useQuery to provide standardized error handling.
 * It accepts a query key, a query function, an error message, and an optional enabled flag.
 * If the query fails, it dispatches an error message to the snackbar using Redux.
 *
 * @template T - The type of data returned by the query function.
 * @param {THookQueryProps<T>} options - The options for the hook query.
 * @returns {UseQueryResult<T, AxiosError>} - The result of the useQuery hook.
 *
 * useHookMutation is a custom hook that wraps around React Query's useMutation to provide standardized error handling.
 * It accepts a mutation function, an error message, an optional success message, and an optional onSuccess callback.
 * If the mutation fails, it dispatches an error message to the snackbar using Redux.
 */

export function useHookQuery<TQueryFnData, TData = TQueryFnData>(
    options: THookQueryProps<TQueryFnData, TData>
): UseQueryResult<TData, AxiosError> {
    const dispatch = useAppDispatch();

    const query = useQuery<TQueryFnData, AxiosError, TData>({
        queryKey: options.queryKey,
        queryFn: options.queryFn,
        retry: options.retry ?? 0,
        enabled: options.enabled ?? true,
        staleTime: options.staleTime,
        select: options.select,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(setSnackbarError(getAxiosErrorMessage(query.error, options.errorMessage)));
            console.error("Request error:", query.error);
        }
    }, [query.error, dispatch, options.errorMessage]);

    return query;
}

/**
 * useHookMutation is a custom hook that wraps around React Query's useMutation to provide standardized error handling.
 * It accepts a mutation function, an error message, an optional success message, and an optional onSuccess callback.
 * If the mutation fails, it dispatches an error message to the snackbar using Redux.
 *
 * @template TVariables - The type of variables passed to the mutation function.
 * @template TData - The type of data returned by the mutation function.
 * @param options - The options for the hook mutation.
 * @returns The result of the useMutation hook.
 */

export function useHookMutation<TVariables, TData = void>(options: THookMutationProps<TVariables, TData>) {
    const dispatch = useAppDispatch();

    return useMutation<TData, AxiosError, TVariables>({
        mutationFn: options.mutationFn,
        retry: 0,
        onError: (error) => {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(error, options.errorMessage)
                )
            );
            console.error('Request error:', error);
        },
        onSuccess: (data, variables) => {
            if (options.successMessage) {
                dispatch(setSnackbarSuccess(options.successMessage));
            }
            options.onSuccess?.(data, variables);
        },
    });
}