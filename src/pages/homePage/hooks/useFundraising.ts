import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import type {FundraisingListResponseDTO, FundraisingRequestDTO} from "@pages/homePage/api/types.ts";
import {
    type AddEditFundraisingFormValues,
    cancelFundraising,
    confirmFundraising,
    createFundraising,
    editFundraising, getOthersFundraisingList,
    getPersonalFundraisingList
} from "@pages";

export function mapFundraisingFormValuesToDTO(
    artistId: string,
    values: AddEditFundraisingFormValues
): FundraisingRequestDTO {
    return {
        artistId: artistId,
        fundraisingName: values.fundraisingName,
        venueId: values.venueId,
        targetAmount: values.targetAmount,
        eventDate: values.eventDate.toISOString()
    };
}

export function useFundraisingQuery<T>(options: {
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

export function useFundraisingMutation<TVariables, TData = void>(options: {
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
            console.error('Fundraising mutation error:', err);
        },
    });
}

export function useGetFundraising() {
    return useFundraisingQuery<FundraisingListResponseDTO>({
        queryKey: ['fundraising'],
        queryFn: () => getOthersFundraisingList(),
        errorMessage: "Errore durante la richiesta della lista delle raccolte fondi!"
    });
}

export function useGetPersonalFundraisingList() {
    return useFundraisingQuery<FundraisingListResponseDTO>({
        queryKey: ['personal-fundraising'],
        queryFn: () => getPersonalFundraisingList(),
        errorMessage: "Errore durante la richiesta della lista delle tue raccolte fondi!"
    });
}

export function useCreateFundraising() {
    return useFundraisingMutation<FundraisingRequestDTO>({
        mutationKey: ['create-fundraising'],
        mutationFn: (payload) => createFundraising(payload),
        errorMessage: "Errore durante la creazione della raccolta fondi!",
        successMessage: "Raccolta fondi creata con successo!",
        invalidateQueries: [
            ['fundraising'],
            ['personal-fundraising'],
        ],
    });
}

export function useCancelFundraising() {
    return useFundraisingMutation<string>({
        mutationKey: ['cancel-fundraising'],
        mutationFn: (fundraisingId) => cancelFundraising(fundraisingId),
        errorMessage: "Errore durante l'annullamento della raccolta fondi!",
        successMessage: "Raccolta fondi annullata con successo!",
        invalidateQueries: [
            ['fundraising'],
            ['personal-fundraising'],
        ],
    });
}

export function useEditFundraising() {
    return useFundraisingMutation<{
        fundraisingId: string;
        payload: FundraisingRequestDTO;
    }>({
        mutationKey: ['edit-fundraising'],
        mutationFn: ({fundraisingId, payload}) =>
            editFundraising(fundraisingId, payload),
        errorMessage: "Errore durante la modifica della raccolta fondi!",
        successMessage: "Raccolta fondi modificata con successo!",
        invalidateQueries: [
            ['fundraising'],
            ['personal-fundraising'],
        ],
    });
}

export function confirmFundraisingAndCreateEvent() {
    return useFundraisingMutation<string>({
        mutationKey: ['confirm-fundraising'],
        mutationFn: (fundraisingId) => confirmFundraising(fundraisingId),
        errorMessage: "Errore durante la creazione dell'evento!",
        successMessage: "Raccolta fondi confermata con successo.\nEvento creato!",
        invalidateQueries: [
            ['fundraising'],
            ['personal-fundraising'],
        ],
    });
}
