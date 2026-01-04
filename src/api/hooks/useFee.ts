import {useHookQuery} from "@api/hooks/hooksQuery.ts";
import {
    getArtistsSubscriptions,
    getFansFeePlans,
    getVenuesFeePlans,
    type Subscription,
    type SubscriptionListResponseDTO
} from "@pages";

export function useArtistsSubscriptions() {
    return useHookQuery<SubscriptionListResponseDTO, Subscription>({
        queryKey: ['artist', 'subscription'],
        queryFn: () => getArtistsSubscriptions(),
        select: (res) => res?.subscriptions[0],
        errorMessage: "Errore durante la richiesta dei piani tariffari per artisti!"
    });
}

export function useVenuesSubscriptions() {
    return useHookQuery<SubscriptionListResponseDTO, Subscription>({
        queryKey: ['venue', 'subscription'],
        queryFn: () => getVenuesFeePlans(),
        select: (res) => res?.subscriptions[0],
        errorMessage: "Errore durante la richiesta dei piani tariffari per esercenti!"
    });
}

export function useFansSubscriptions() {
    return useHookQuery<SubscriptionListResponseDTO, Subscription>({
        queryKey: ['fan', 'subscription'],
        queryFn: () => getFansFeePlans(),
        select: (res) => res?.subscriptions[0],
        errorMessage: "Errore durante la richiesta dei piani tariffari per fan!"
    });
}