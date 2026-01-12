import type {ActionProps} from "@utils";
import type {Artist, Venue} from "@pages";
import FilterListIcon from "@mui/icons-material/FilterList";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function EventPanelActions(
    artists: Artist[] | undefined,
    venues: Venue[] | undefined,
    setShowStatusFilters: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    setVenueFilter: (value: string) => void,
    setArtistFilter: (value: string) => void,
): ActionProps[] {
    return [
        {
            label: 'Filtra per stato',
            startIcon: <FilterListIcon/>,
            onClick: () => setShowStatusFilters(prev => !prev)
        },
        {
            label: 'Filtra per location',
            startIcon: <HomeWorkIcon/>,
            dropdown: [
                {value: "-", label: "Tutte le location"},
                ...(venues ?? []).map((venue) => ({
                    value: venue.userId,
                    label: venue.venueName ?? "",
                })),
            ],
            onSelect: (value: string) => {
                setVenueFilter(value);
            }
        },
        {
            label: 'Filtra per artista',
            startIcon: <MusicNoteIcon/>,
            dropdown: [
                {value: "-", label: "Tutti gli artisti"},
                ...(artists ?? []).map((artist) => ({
                    value: artist.userId,
                    label: `${artist.name} ${artist.surname}`,
                })),
            ],
            onSelect: (value: string) => {
                setArtistFilter(value);
            }
        }
    ];

}