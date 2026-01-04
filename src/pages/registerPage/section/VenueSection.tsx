import {type ReactElement, useMemo, useState} from "react";
import type {LatLngLiteral} from "leaflet";
import {useFormContext} from "react-hook-form";
import {TextFormField} from "@components";
import {MapDialog} from "@pages";

type VenueFormValues = {
    venueName: string;
    venueAddress: LatLngLiteral | null;
};

export default function VenueSection(): ReactElement {
    const [open, setOpen] = useState(false);
    const {control, watch} = useFormContext<VenueFormValues>();

    const currentVenueAddress = watch("venueAddress");

    const coordsDisplay = useMemo(() => {
        if (!currentVenueAddress) return "";
        const {lat, lng} = currentVenueAddress;
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }, [currentVenueAddress]);

    return (
        <>
            <TextFormField
                control={control}
                name="venueName"
                label="Indirizzo"
                onClick={() => setOpen(true)}
                sx={{cursor: "pointer"}}
            />
            <span>{coordsDisplay}</span>
            <MapDialog control={control} open={open} onClose={() => setOpen(false)}/>
        </>
    );
};
