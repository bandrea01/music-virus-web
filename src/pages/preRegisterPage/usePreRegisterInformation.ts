import {useMemo} from "react";
import {UserTypeEnum, type UserTypeKey} from "@utils/enum/UserTypeEnum.ts";
import {useArtistsSubscriptions, useFansSubscriptions, useVenuesSubscriptions} from "@api/hooks/useFee.ts";
import type {Subscription} from "@pages";

export type TPreRegisterInformation = {
    userType: UserTypeKey;
    name: string;
    fee: string;
    image: string;
    benefits: string[];
}

function getSubscriptionAmountLabel(subscription: Subscription | null): string | null {
    if(!subscription) return "Gratuito";
    else {
        switch(subscription.feePeriod) {
            case "DAILY":
                return `${subscription.amount} €/giorno`;
            case "WEEKLY":
                return `${subscription.amount} €/settimana`;
            case "MONTHLY":
                return `${subscription.amount} €/mese`;
            case "YEARLY":
                return `${subscription.amount} €/anno`;
            default:
                return null;
        }
    }
}

export function usePreRegisterInformation(): TPreRegisterInformation[] {

    const {data: artistsFeePlan} = useArtistsSubscriptions();
    const {data: venuesFeePlan} = useVenuesSubscriptions();
    const {data: fansFeePlan} = useFansSubscriptions();

    const getFeeDataFromUserType = (userType: UserTypeKey) => {
        if (userType === UserTypeEnum.ARTIST) return artistsFeePlan || null;
        if (userType === UserTypeEnum.VENUE) return venuesFeePlan || null;
        if (userType === UserTypeEnum.FAN) return fansFeePlan || null;
        return null;
    }

    return useMemo<TPreRegisterInformation[]>(
        () => [
            {
                userType: UserTypeEnum.FAN,
                name: "Fan",
                fee: getSubscriptionAmountLabel(getFeeDataFromUserType(UserTypeEnum.FAN)) || "N/A",
                image: "🎵",
                benefits: [
                    "Scopri artisti emergenti",
                    "Supporta i tuoi preferiti",
                    "Accesso a eventi esclusivi",
                ],
            },
            {
                userType: UserTypeEnum.ARTIST,
                name: "Artist",
                fee: getSubscriptionAmountLabel(getFeeDataFromUserType(UserTypeEnum.ARTIST)) || "N/A",
                image: "🎤",
                benefits: [
                    "Promuovi la tua musica",
                    "Crea campagne per i tuoi eventi",
                    "Visualizza lo stato dei tuoi eventi",
                ],
            },
            {
                userType: UserTypeEnum.VENUE,
                name: "Venue",
                fee: getSubscriptionAmountLabel(getFeeDataFromUserType(UserTypeEnum.VENUE)) || "N/A",
                image: "🏛️",
                benefits: [
                    "Gestisci eventi live",
                    "Trova artisti emergenti",
                    "Massimizza i ricavi",
                ],
            },
        ],
        [artistsFeePlan, venuesFeePlan, fansFeePlan]
    );
}
