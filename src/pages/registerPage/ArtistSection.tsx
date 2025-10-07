import React from "react";
import {Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField,} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

const GENRES = [
    "Pop","Rock","Indie","Hip-Hop","Trap","R&B","Soul","Jazz",
    "Blues","Funk","Disco","House","Techno","EDM","Dubstep",
    "Drum & Bass","Reggae","Ska","Punk","Metal","Folk",
    "Cantautorato","Classica","Colonne Sonore","World",
];

type ArtistFormValues = {
    artistGenres: string[];
    artistSocial: string;
};

export const ArtistSection: React.FC = () => {
    const { control, register, formState: { errors } } = useFormContext<ArtistFormValues>();

    const hasGenresError = Boolean((errors as any)?.artistGenres);

    return (
        <>
            <FormControl fullWidth size="small" margin="dense" error={hasGenresError}>
                <InputLabel id="artist-genres-label">Generi musicali</InputLabel>

                <Controller
                    name={"artistGenres" as const}
                    control={control}
                    render={({ field }) => (
                        <Select
                            multiple
                            value={field.value ?? []}
                            onChange={(e) => field.onChange(e.target.value as string[])}
                            input={<OutlinedInput label="Generi musicali" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} size="small" />
                                    ))}
                                </Box>
                            )}
                            MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}
                        >
                            {GENRES.map((g) => (
                                <MenuItem key={g} value={g}>{g}</MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <TextField
                    label="Social media"
                    fullWidth
                    size="small"
                    margin="dense"
                    {...register("artistSocial")}
                    error={!!errors?.artistSocial}
                    helperText={(errors?.artistSocial?.message) || ""}
                />
            </FormControl>


        </>
    );
};
