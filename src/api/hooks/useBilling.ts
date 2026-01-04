import {useQueryClient} from "@tanstack/react-query";
import {useHookMutation} from "@api";
import {deposit, type DepositRequestDTO} from "@pages";

export function useDeposit() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        accountId: string;
        payload: DepositRequestDTO
    }>({
        mutationFn: ({accountId, payload}) => deposit(accountId, payload),
        errorMessage: "Errore durante il deposito!",
        successMessage: "Deposito effettuato con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['account']}).then(() => {
            });
        },
    });
}