import type {ReactElement} from "react";
import {useCallback, useMemo} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import type {LatLngLiteral} from "leaflet";
import {Box} from "@mui/material";
import {DialogComponent, MapPicker, TextFormField} from "@components";
import {useAddEditUserForm, type UserFormValues} from "@pages";

type VenueMapPickerProps = {
  open: boolean;
  onClose: () => void;
};

export default function VenueMapPicker({
                                         open,
                                         onClose,
                                       }: VenueMapPickerProps): ReactElement {

  const {control, setValue, resetField, trigger} = useFormContext<UserFormValues>();

  const venueName = useWatch({control, name: "venueName"});
  const venueAddress = useWatch({control, name: "venueAddress"});

  const isConfirmDisabled = useMemo(() => {
    return !venueName || !venueAddress;
  }, [venueName, venueAddress]);

  // Adapter MapPicker -> Form
  const handlePickAddress = useCallback(
    (position: LatLngLiteral) => {
      setValue("venueAddress", position, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }, [setValue]
  );

  const handleCancel = useCallback(() => {
    resetField("venueName", {defaultValue: ""});
    resetField("venueAddress", {defaultValue: null});
    onClose();
  }, [resetField, onClose]);

  const handleConfirm = useCallback(async () => {
    const isValid = await trigger(["venueName", "venueAddress"]);
    if (!isValid) return;
    onClose();
  }, [trigger, onClose]);

  return (
    <DialogComponent
      isOpen={open}
      onClose={onClose}
      title="Indirizzo del locale"
      subtitle="Inserisci il nome del tuo locale e seleziona le coordinate sulla mappa."
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
          disabled: isConfirmDisabled,
        },
      ]}
    >
      <TextFormField control={control} name="venueName" label="Nome del locale"/>

      <Box mt={2}>
        <MapPicker
          value={venueAddress ?? null}
          onChange={handlePickAddress}
          height={300}
        />
      </Box>
    </DialogComponent>
  );
};