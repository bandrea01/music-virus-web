import {Box, Chip,} from "@mui/material";
import {useFormContext} from "react-hook-form";
import {getSelectOptions, SelectFormField, TextFormField} from "@components";
import type {ReactElement} from "react";

export const genres = [
    "Pop", "Rock", "Indie", "Hip-Hop", "Trap", "R&B", "Soul", "Jazz",
    "Blues", "Funk", "Disco", "House", "Techno", "EDM", "Dubstep",
    "Drum & Bass", "Reggae", "Ska", "Punk", "Metal", "Folk",
    "Cantautorato", "Classica", "Colonne Sonore", "World",
];

type ArtistFormValues = {
    artistGenres: string[];
    artistSocial: string;
};

export default function ArtistSection(): ReactElement{
    const {control, getValues, setValue} = useFormContext<ArtistFormValues>();
    const genresOptions = getSelectOptions(genres);

    return (
        <>
            <SelectFormField
                control={control}
                name="artistGenres"
                label="I tuoi generi musicali"
                menuItems={genresOptions}
                renderValue={(selected) => {
                    const arr = Array.isArray(selected) ? selected : [];
                    if (arr.length === 0) return <em>Seleziona generi…</em>;
                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: '200px' }}>
                            {arr.map((v) => (
                                <Chip
                                    key={v}
                                    label={v}
                                    size="small"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onDelete={() => {
                                        const current = getValues('artistGenres') ?? [];
                                        const next = Array.isArray(current) ? current.filter(x => x !== v) : [];
                                        setValue('artistGenres', next, { shouldValidate: true, shouldDirty: true });
                                    }}
                                />
                            ))}
                        </Box>
                    );
                }}
                multiple
            />
            <TextFormField
                control={control}
                name="artistSocial"
                label="Social media"
                fullWidth
            />
        </>

    );
};
