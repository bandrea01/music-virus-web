import React, {useEffect, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography} from "@mui/material";
import {useFormContext} from "react-hook-form";
import type {LatLngLiteral} from "leaflet";
import {MapPicker} from "../../components/MapPicker";

type FormValues = {
    venueName: string;
    venueAddress: LatLngLiteral | null;
};

type MapDialogProps = {
    open: boolean;
    onClose: () => void;
};

export const MapDialog: React.FC<MapDialogProps> = ({ open, onClose }) => {
    const { getValues, setValue, trigger } = useFormContext<FormValues>();

    const [tempVenueName, setTempVenueName] = useState<string>("");
    const [tempVenueAddress, setTempVenueAddress] = useState<LatLngLiteral | null>(null);

    // inizializza i buffer quando si apre la modale
    useEffect(() => {
        if (open) {
            setTempVenueName(getValues("venueName") ?? "");
            setTempVenueAddress(getValues("venueAddress") ?? null);
        }
    }, [open, getValues]);

    const handleDialogClose: React.ComponentProps<typeof Dialog>["onClose"] = (_e, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
    };

    const handleCancel = async () => {
        setValue("venueName", "", { shouldDirty: true, shouldValidate: true });
        setValue("venueAddress", null, { shouldDirty: true, shouldValidate: true });
        await trigger(["venueName", "venueAddress"]);
        onClose();
    };

    const handleConfirm = async () => {
        if (!tempVenueName || !tempVenueAddress) return;
        setValue("venueName", tempVenueName, { shouldDirty: true, shouldValidate: true });
        setValue("venueAddress", tempVenueAddress, { shouldDirty: true, shouldValidate: true });
        await trigger(["venueName", "venueAddress"]);
        onClose();
    };

    const isConfirmDisabled = !(tempVenueName && tempVenueAddress);

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            scroll="body"
            fullWidth
            maxWidth="md"
            slotProps={{
                paper: { className: "mv-dialog__paper" },
                backdrop: { className: "mv-dialog__backdrop" },
            }}
        >
            <Box className="mv-dialog__header">
                <div className="mv-dialog__titles">
                    <Typography className="mv-dialog__title">Indirizzo del locale</Typography>
                    <Typography className="mv-dialog__subtitle">
                        Inserisci il nome del tuo locale e seleziona le coordinate sulla mappa.
                    </Typography>
                </div>
            </Box>

            <DialogContent className="mv-dialog__content">
                <TextField
                    label="Nome Locale"
                    fullWidth
                    margin="dense"
                    value={tempVenueName}
                    onChange={(e) => setTempVenueName(e.target.value)}
                    autoFocus
                />

                <Box mt={2}>
                    <MapPicker value={tempVenueAddress} onChange={setTempVenueAddress} height={300} />
                </Box>
            </DialogContent>

            <DialogActions className="mv-dialog__actions">
                <Button onClick={handleCancel} className="btn btn--ghost">Annulla</Button>
                <Button
                    onClick={handleConfirm}
                    className="btn btn--primary"
                    variant="contained"
                    disabled={isConfirmDisabled}
                >
                    Conferma
                </Button>
            </DialogActions>
        </Dialog>
    );
};
