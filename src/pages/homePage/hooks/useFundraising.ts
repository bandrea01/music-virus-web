import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useAppDispatch} from '@store/hook.ts';
import {setSnackbarError, setSnackbarSuccess} from '@store/snackbar/slice.ts';
import {getAxiosErrorMessage} from "@apiService/axios.ts";
import type {AxiosError} from "axios";
import type {FundraisingListResponseDTO, FundraisingRequestDTO} from "@pages/homePage/api/types.ts";
import {
    cancelFundraising,
    confirmFundraising,
    createFundraising,
    editFundraising,
    getFundraisingList,
    getPersonalFundraisingList
} from "@pages/homePage/api/fundraising.ts";
import type {AddEditFundraisingFormValues} from "@pages/homePage/form/addEditFundraisingSchema.ts";

export function mapFundraisingFormValuesToDTO(artistId: string, values: AddEditFundraisingFormValues): FundraisingRequestDTO {
    return {
        artistId: artistId,
        fundraisingName: values.fundraisingName,
        venueId: values.venueId,
        targetAmount: values.targetAmount,
        eventDate: values.eventDate.toISOString()
    }
}

export function useCreateFundraising() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ['fundraising'],
        mutationFn: async (payload: FundraisingRequestDTO) => {
            return createFundraising(payload);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Raccolta fondi creata con successo!'));
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la creazione della raccolta fondi!")));
            console.error('Fundraising creation error:', err);
        },
    });
}

export function useGetFundraising() {
    const dispatch = useAppDispatch();

    const query = useQuery<FundraisingRequestDTO, AxiosError>({
        queryKey: ['fundraising'],
        queryFn: getFundraisingList,
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta della lista di artisti!")
                )
            );
            console.error('Request error:', query.error);
        }
        dispatch(setSnackbarSuccess("Raccolta fondi creata con successo!"));
    }, [query.error, dispatch]);

    return {...query}
}

export function useGetPersonalFundraisingList(userId: string) {
    const dispatch = useAppDispatch();

    const query = useQuery<FundraisingListResponseDTO, AxiosError>({
        queryKey: ['fundraising'],
        queryFn: () => getPersonalFundraisingList(userId),
        retry: 0,
    });

    useEffect(() => {
        if (query.error) {
            dispatch(
                setSnackbarError(
                    getAxiosErrorMessage(query.error, "Errore durante la richiesta della lista di artisti!")
                )
            );
            console.error('Request error:', query.error);
        }
    }, [query.error, dispatch]);

    return {...query}
}

export function useCancelFundraising() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ['cancelFundraising'],
        mutationFn: async (fundraisingId: string) => {
            return cancelFundraising(fundraisingId);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Raccolta fondi annullata con successo!'));
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante l'annullamento della raccolta fondi!")));
            console.error('Fundraising cancellation error:', err);
        }
    });
}

export function useEditFundraising(payload: any) {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ['editFundraising'],
        mutationFn: async (fundraisingId: string) => {
            return editFundraising(fundraisingId, payload);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Raccolta fondi modificata con successo!'));
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la modifica della raccolta fondi!")));
            console.error('Fundraising cancellation error:', err);
        }
    });
}

export function confirmFundraisingAndCreateEvent() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationKey: ['confirmFundraising'],
        mutationFn: async (fundraisingId: string) => {
            return confirmFundraising(fundraisingId);
        },
        retry: 0,
        onSuccess: () => {
            dispatch(setSnackbarSuccess('Raccolta fondi confermata con successo.\nEvento creato!'));
        },
        onError: (err: AxiosError) => {
            dispatch(setSnackbarError(getAxiosErrorMessage(err, "Errore durante la creazione dell'evento!")));
            console.error('Fundraising cancellation error:', err);
        }
    });
}
