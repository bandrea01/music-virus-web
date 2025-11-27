import type { ArtistProfileDTO } from "@pages/homePage/api/types.ts";

export function sortArtists(artists: ArtistProfileDTO[]): ArtistProfileDTO[] {
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
