import {useMemo} from "react";

export type UserTypeId = "fan" | "artist" | "venue";

export type UserType = {
    id: UserTypeId;
    name: string;
    fee: string;
    benefits: string[];
    symbol: string;
    image: string;
};

export function useUserType() {
    const userTypes: UserType[] = useMemo(
        () => [
            {
                id: "fan",
                name: "Fan",
                fee: "Gratuito",
                image: "🎵",
                benefits: [
                    "Scopri artisti emergenti",
                    "Supporta i tuoi preferiti",
                    "Accesso a eventi esclusivi",
                ],
                symbol: "♥",
            },
            {
                id: "artist",
                name: "Artist",
                fee: "€29/mese",
                image: "🎤",
                benefits: [
                    "Promuovi la tua musica",
                    "Crea campagne per i tuoi eventi",
                    "Visualizza lo stato dei tuoi eventi",
                ],
                symbol: "🎙️",
            },
            {
                id: "venue",
                name: "Venue",
                fee: "€99/mese",
                image: "🏛️",
                benefits: [
                    "Gestisci eventi live",
                    "Trova artisti emergenti",
                    "Massimizza i ricavi",
                ],
                symbol: "📍",
            },
        ],
        []
    );

    return { userTypes };
}
