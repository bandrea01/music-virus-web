import type {Artist} from "@pages/homePage/api/types.ts";

export function sortArtists(artists: Artist[]): Artist[] {
    return [...artists].sort((a, b) => {
        if (a.enabled !== b.enabled) {
            return a.enabled ? -1 : 1;
        }
        if (a.approved !== b.approved) {
            return a.approved ? 1 : -1;
        }
        return 0;
    });
}

export function formatDate(dateString: string, withWeekDay: boolean = false): string {
    console.log("Formatting date:", dateString, "withWeekDay:", withWeekDay);
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("it-IT");
    if (!withWeekDay) return formattedDate;
    const day = new Intl.DateTimeFormat("it-IT", { weekday: 'long' }).format(date);
    return `${capitalize(day)} ${formattedDate}`;
}

export function formatDateWithTime(dateString: string) {
    const date = new Date(dateString);

    const day = new Intl.DateTimeFormat("it-IT", {weekday: "long"}).format(date);
    const formattedDate = date.toLocaleDateString("it-IT");
    const formattedTime = date.toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return `${capitalize(day)} ${formattedDate} - ${formattedTime}`;
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
