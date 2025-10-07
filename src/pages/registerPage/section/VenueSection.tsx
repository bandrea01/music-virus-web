import React, {useMemo, useState} from "react";
import type {LatLngLiteral} from "leaflet";
import {TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {MapDialog} from "./MapDialog.tsx";

type VenueFormValues = {
    venueName: string;
    venueAddress: LatLngLiteral | null;
};

export const VenueSection: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { control, formState: { errors }, watch } = useFormContext<VenueFormValues>();

    const currentVenueAddress = watch("venueAddress");

    const coordsDisplay = useMemo(() => {
        if (!currentVenueAddress) return "";
        const { lat, lng } = currentVenueAddress;
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }, [currentVenueAddress]);

    const helperText = useMemo(() => {
        if (errors?.venueName?.message) return String(errors.venueName.message);
        if (errors?.venueAddress?.message) return String(errors.venueAddress.message);
        if (coordsDisplay) return `Coordinate: ${coordsDisplay}`;
        return "";
    }, [errors, coordsDisplay]);

    const hasError = Boolean(errors?.venueName || errors?.venueAddress);

    return (
        <>
            <Controller
                name="venueName"
                control={control}
                render={({ field }) => (
                    <TextField
                        label="Indirizzo"
                        fullWidth
                        size="small"
                        margin="dense"
                        value={field.value ?? ""}
                        onClick={() => setOpen(true)}
                        onFocus={(e) => {
                            e.target.blur();
                            setOpen(true);
                        }}
                        error={hasError}
                        helperText={helperText}
                        slotProps={{
                            input: { readOnly: true },
                            formHelperText: { sx: { color: "white", "&.Mui-error": { color: "white" } } },
                        }}
                        sx={{
                            "& .MuiInputBase-root, & .MuiInputBase-input, & .MuiOutlinedInput-notchedOutline": {
                                cursor: "pointer",
                            },
                        }}
                    />
                )}
            />

            <MapDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};
