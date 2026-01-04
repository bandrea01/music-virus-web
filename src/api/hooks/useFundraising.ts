import type {FundraisingListResponseDTO, FundraisingRequestDTO} from "@pages/homePage/api/types.ts";
import {
    cancelFundraising,
    confirmFundraising,
    createFundraising,
    editFundraising,
    getOthersFundraisingList,
    getPersonalFundraisingList
} from "@pages";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";
import {useQueryClient} from "@tanstack/react-query";

export function useGetFundraising() {
    return useHookQuery<FundraisingListResponseDTO>({
        queryKey: ['fundraising'],
        queryFn: () => getOthersFundraisingList(),
        errorMessage: "Errore durante la richiesta della lista delle raccolte fondi!"
    });
}

export function useGetPersonalFundraisingList() {
    return useHookQuery<FundraisingListResponseDTO>({
        queryKey: ['personal-fundraising'],
        queryFn: () => getPersonalFundraisingList(),
        errorMessage: "Errore durante la richiesta della lista delle tue raccolte fondi!"
    });
}

export function useCreateFundraising() {
    const queryClient = useQueryClient();
    return useHookMutation<FundraisingRequestDTO>({
        mutationFn: (payload) => createFundraising(payload),
        errorMessage: "Errore durante la creazione della raccolta fondi!",
        successMessage: "Raccolta fondi creata con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
            });
        },
    });
}

export function useCancelFundraising() {
    const queryClient = useQueryClient();
    return useHookMutation<string>({
        mutationFn: (fundraisingId) => cancelFundraising(fundraisingId),
        errorMessage: "Errore durante l'annullamento della raccolta fondi!",
        successMessage: "Raccolta fondi annullata con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
            });
        },
    });
}

export function useEditFundraising() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        fundraisingId: string;
        payload: FundraisingRequestDTO;
    }>({
        mutationFn: ({fundraisingId, payload}) =>
            editFundraising(fundraisingId, payload),
        errorMessage: "Errore durante la modifica della raccolta fondi!",
        successMessage: "Raccolta fondi modificata con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
            });
        },
    });
}

export function confirmFundraisingAndCreateEvent() {
    const queryClient = useQueryClient();
    return useHookMutation<string>({
        mutationFn: (fundraisingId) => confirmFundraising(fundraisingId),
        errorMessage: "Errore durante la creazione dell'evento!",
        successMessage: "Raccolta fondi confermata con successo.\nEvento creato!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {
            });
        },
    });
}
