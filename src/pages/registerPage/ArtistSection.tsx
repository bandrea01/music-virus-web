import React from "react";
import {
    Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { RegisterFormValues } from "../../schema/registerSchema";

const GENRES = [
    "Pop","Rock","Indie","Hip-Hop","Trap","R&B","Soul","Jazz",
    "Blues","Funk","Disco","House","Techno","EDM","Dubstep",
    "Drum & Bass","Reggae","Ska","Punk","Metal","Folk",
    "Cantautorato","Classica","Colonne Sonore","World",
];

export const ArtistSection: React.FC = () => {
    const { control, register, formState: { errors } } = useFormContext<RegisterFormValues>();

    return (
        <>
            <FormControl fullWidth size="small" margin="dense" error={!!errors.genres}>
                <InputLabel id="genres-label">Generi musicali</InputLabel>

                <Controller
                    name="genres"
                    control={control}
                    render={({ field }) => (
                        <Select
                            labelId="genres-label"
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

                {!!errors.genres && (
                    <FormHelperText>{errors.genres?.message as string}</FormHelperText>
                )}
            </FormControl>

            <TextField
                label="Social media"
                fullWidth
                size="small"
                margin="dense"
                {...register("socials")}
                error={!!errors.socials}
                helperText={errors.socials?.message as string}
            />
        </>
    );
};
