import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useFormContext} from "react-hook-form";
import type {LatLngLiteral} from "leaflet";
import {MapPicker, TextFormField} from "@/components";
import DialogComponent from "@components/DialogComponent.tsx";

type FormValues = {
    venueName: string;
    venueAddress: LatLngLiteral | null;
};

type MapDialogProps = {
    open: boolean;
    onClose: () => void;
    control: any;
};

export const MapDialog: React.FC<MapDialogProps> = ({open, onClose, control}) => {
    const { getValues, setValue, trigger} = useFormContext<FormValues>();

    const [tempVenueName, setTempVenueName] = useState<string>("");
    const [tempVenueAddress, setTempVenueAddress] = useState<LatLngLiteral | null>(null);

    console.log("Temp Venue Address:", tempVenueAddress);
    console.log("Temp Venue Name:", tempVenueName);;

    useEffect(() => {
        if (open) {
            setTempVenueName(getValues("venueName") ?? "");
            setTempVenueAddress(getValues("venueAddress") ?? null);
        }
    }, [open, getValues]);

    const handleDialogClose = (_e?: object, reason?: "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
    };

    const handleCancel = async () => {
        setValue("venueName", "", {shouldDirty: true, shouldValidate: true});
        setValue("venueAddress", null, {shouldDirty: true, shouldValidate: true});
        await trigger(["venueName", "venueAddress"]);
        onClose();
    };

    const handleConfirm = async () => {
        if (!tempVenueName || !tempVenueAddress) return;
        setValue("venueName", tempVenueName, {shouldDirty: true, shouldValidate: true});
        setValue("venueAddress", tempVenueAddress, {shouldDirty: true, shouldValidate: true});
        await trigger(["venueName", "venueAddress"]);
        onClose();
    };

    const isConfirmDisabled = !(tempVenueName && tempVenueAddress);

    return (
        <DialogComponent
            isOpen={open}
            onClose={handleDialogClose}
            title="Indirizzo del locale"
            subtitle="Inserisci il nome del tuo locale e seleziona le coordinate sulla mappa."
            className="auth-form"
            actions={[
                {
                    label: "Annulla",
                    onClick: handleCancel,
                    color: "primary",
                    variant: "contained",
                },
                {
                    label: "Conferma",
                    onClick: handleConfirm,
                    color: "secondary",
                    variant: "contained",
                    disabled: isConfirmDisabled

                }
            ]}
        >
            <TextFormField
                control={control}
                name="venueName"
                label="Nome Locale"
            />

            <Box mt={2}>
                <MapPicker value={tempVenueAddress} onChange={setTempVenueAddress} height={300}/>
            </Box>
        </DialogComponent>
    );
};
