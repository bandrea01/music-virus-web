import {useQueryClient} from "@tanstack/react-query";
import {useHookMutation} from "@api";
import {type ContributionRequestDTO, deposit, type DepositRequestDTO, sendContribution} from "@pages";

export function useDeposit() {
    const queryClient = useQueryClient();
    return useHookMutation<DepositRequestDTO>({
        mutationFn: (payload) => deposit(payload),
        errorMessage: "Errore durante il deposito!",
        successMessage: "Deposito effettuato con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['account']}).then(() => {
            });
        },
    });
}

export function useContribution() {
    const queryClient = useQueryClient();
    return useHookMutation<ContributionRequestDTO>({
        mutationFn: (payload) => sendContribution(payload),
        errorMessage: "Errore durante l'invio del contributo alla raccolta fondi!",
        successMessage: "Contributo registrato con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {});
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {});
        }
    })
}