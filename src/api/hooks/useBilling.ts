import {useQueryClient} from "@tanstack/react-query";
import {useHookMutation, useHookQuery} from "@api";
import {
    type ContributionRequestDTO,
    deposit,
    type DepositRequestDTO, getPersonalTickets,
    getPersonalTransactions, getTicket,
    sendContribution, type Ticket, type TicketsDTO, type Transaction,
    type TransactionsDTO
} from "@pages";

export function useDeposit(userId: string | undefined) {
    const queryClient = useQueryClient();
    return useHookMutation<DepositRequestDTO>({
        mutationFn: (payload) => deposit(payload),
        errorMessage: "Errore durante il deposito!",
        successMessage: "Deposito effettuato con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [userId, 'account']}).then(() => {
            });
        },
    });
}

export function useContribution() {
    const queryClient = useQueryClient();
    return useHookMutation<ContributionRequestDTO>({
        mutationFn: (payload) => sendContribution(payload),
        successMessage: "Contributo registrato con successo!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fundraising']}).then(() => {});
            queryClient.invalidateQueries({queryKey: ['personal-fundraising']}).then(() => {});
        }
    })
}

export function useGetTransactions(userId: string) {
    return useHookQuery<TransactionsDTO, Transaction[]>({
        queryKey: [userId, 'transactions'],
        queryFn: getPersonalTransactions,
        select: (res) => res.transactions ?? [],
        errorMessage: "Errore durante la richiesta di transazioni personali"
    })
}

export function useGetTickets(userId: string) {
    return useHookQuery<TicketsDTO, Ticket[]>({
        queryKey: [userId, 'tickets'],
        queryFn: getPersonalTickets,
        select: (res) => res.tickets ?? [],
        errorMessage: "Errore durante la richiesta di biglietti personali"
    })
}

export function useGetTicket(ticketId: string) {
    return useHookQuery<Ticket, Ticket>({
        queryKey: ['ticket', ticketId],
        queryFn: () => getTicket(ticketId),
        errorMessage: "Errore durante la richiesta del biglietto"
    })
}