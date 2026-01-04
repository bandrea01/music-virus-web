import {useQueryClient} from '@tanstack/react-query';
import type {
    ArtistListResponseDTO,
    FanListResponseDTO,
    StatisticDTO,
    Subscription,
    SubscriptionListResponseDTO,
    SubscriptionRequestDTO,
    Tax,
    TaxListResponseDTO,
    TaxRequestDTO,
    VenueListResponseDTO
} from "@pages/homePage/api/types.ts";
import {
    approveArtist,
    banUser,
    createSubscription,
    createTax, deleteSubscription, deleteTax,
    editSubscription,
    editTax,
    getAdminArtistsList,
    getAdminFansList,
    getAdminStatistics,
    getAdminVenuesList,
    getSubscriptions,
    getTaxes,
    unapproveArtist,
    unbanUser
} from "@pages";
import {useHookMutation, useHookQuery} from "@api/hooks/hooksQuery.ts";

export function useAdminVenues() {
    return useHookQuery<VenueListResponseDTO>({
        queryKey: ['admin', 'venues'],
        queryFn: getAdminVenuesList,
        errorMessage: "Errore durante la richiesta della lista esercenti per l'admin!"
    });
}

export function useAdminArtists() {
    return useHookQuery<ArtistListResponseDTO>({
        queryKey: ['admin', 'artists'],
        queryFn: getAdminArtistsList,
        errorMessage: "Errore durante la richiesta della lista di artisti per l'admin!"
    });
}

export function useAdminFans() {
    return useHookQuery<FanListResponseDTO>({
        queryKey: ['admin', 'fans'],
        queryFn: getAdminFansList,
        errorMessage: "Errore durante la richiesta della lista di fans per l'admin!"
    });
}

export function useAdminStats() {
    return useHookQuery<StatisticDTO>({
        queryKey: ['admin', 'stats'],
        queryFn: getAdminStatistics,
        errorMessage: "Errore durante la richiesta delle statistiche per l'admin!"
    });
}

export function useAdminSubscriptions() {
    return useHookQuery<SubscriptionListResponseDTO, Subscription[]>({
        queryKey: ['admin', 'subscription'],
        queryFn: getSubscriptions,
        select: (res) => res.subscriptions ?? [],
        errorMessage: "Errore durante la richiesta dei piani tariffari!"
    });
}

export function useAdminTaxes() {
    return useHookQuery<TaxListResponseDTO, Tax[]>({
        queryKey: ['admin', 'taxes'],
        queryFn: getTaxes,
        select: (res) => res.taxes ?? [],
        errorMessage: "Errore durante la richiesta delle tassazioni!"
    });
}

export function useAdminCreateSubscription() {
    const queryClient = useQueryClient();
    return useHookMutation<SubscriptionRequestDTO>({
        mutationFn: (payload) => createSubscription(payload),
        errorMessage: "Errore durante la creazione del piano tariffario!",
        successMessage: "Piano tariffario creato con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','subscription'],
                ['artist','subscription'],
                ['fan','subscription'],
                ['venue','subscription'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminEditSubscription() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        feePlanId: string;
        payload: SubscriptionRequestDTO;
    }>({
        mutationFn: ({feePlanId, payload}) =>
            editSubscription(feePlanId, payload),
        errorMessage: "Errore durante la modifica dell piano tariffario!",
        successMessage: "Piano tariffario modificato con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','subscription'],
                ['artist','subscription'],
                ['fan','subscription'],
                ['venue','subscription'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminDeleteSubscription() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        feePlanId: string;
    }>({
        mutationFn: ({feePlanId}) =>
            deleteSubscription(feePlanId),
        errorMessage: "Errore durante l'eliminazione del piano tariffario!",
        successMessage: "Piano tariffario eliminato con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','subscription'],
                ['artist','subscription'],
                ['fan','subscription'],
                ['venue','subscription'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminDeleteTax() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        feePlanId: string;
    }>({
        mutationFn: ({feePlanId}) =>
            deleteTax(feePlanId),
        errorMessage: "Errore durante l'eliminazione della tassa!",
        successMessage: "Tassa eliminata con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','tax'],
                ['artist','tax'],
                ['fan','tax'],
                ['venue','tax'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminCreateTax() {
    const queryClient = useQueryClient();
    return useHookMutation<TaxRequestDTO>({
        mutationFn: (payload) => createTax(payload),
        errorMessage: "Errore durante la creazione della tassa!",
        successMessage: "Tassa creata con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','tax'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminEditTax() {
    const queryClient = useQueryClient();
    return useHookMutation<{
        feePlanId: string;
        payload: TaxRequestDTO;
    }>({
        mutationFn: ({feePlanId, payload}) =>
            editTax(feePlanId, payload),
        errorMessage: "Errore durante la modifica della tassazione!",
        successMessage: "Tassa modificata con successo!",
        onSuccess: async () => {
            const keys = [
                ['admin','tax'],
            ];
            await Promise.all(keys.map(queryKey => queryClient.invalidateQueries({ queryKey })));
        },
    });
}

export function useAdminApproveArtist() {
    const queryClient = useQueryClient();

    return useHookMutation<string>({
        mutationFn: (artistId) => approveArtist(artistId),
        errorMessage: "Errore durante l'approvazione dell'artista!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['domain', 'artists']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['admin', 'artists']}).then(() => {
            });
        }
    });
}

export function useAdminUnapproveArtist() {
    const queryClient = useQueryClient();

    return useHookMutation<string>({
        mutationFn: (artistId) => unapproveArtist(artistId),
        errorMessage: "Errore durante la revoca dell'approvazione dell'artista!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['domain', 'artists']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['admin', 'artists']}).then(() => {
            });
        }
    });
}

export function useAdminBanUser() {
    const queryClient = useQueryClient();

    return useHookMutation<string>({
        mutationFn: (userId) => banUser(userId),
        errorMessage: "Errore durante il ban dell'utente!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['domain', 'artists']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['admin', 'artists']}).then(() => {
            });
        }
    });
}

export function useAdminUnbanUser() {
    const queryClient = useQueryClient();

    return useHookMutation<string>({
        mutationFn: (userId) => unbanUser(userId),
        errorMessage: "Errore durante l'abilitazione dell'utente!",
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['domain', 'artists']}).then(() => {
            });
            queryClient.invalidateQueries({queryKey: ['admin', 'artists']}).then(() => {
            });
        }
    });
}
