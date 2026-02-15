import {type ReactElement, useMemo, useState} from "react";
import {TextFormField} from "@components";
import {type UserFormValues, VenueMapPicker} from "@pages";
import {Box} from "@mui/material";
import {useFormContext, useWatch} from "react-hook-form";

export default function VenueSection(): ReactElement {
  const [open, setOpen] = useState(false);

  //Form
  const {control} = useFormContext<UserFormValues>();

  const venueName = useWatch({control, name: "venueName"});
  const venueAddress = useWatch({control, name: "venueAddress"});

  const normalizedCoordinates = useMemo(() => {
    if (!venueName || !venueAddress) return "";
    const {lat, lng} = venueAddress;
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }, [venueAddress]);

  return (
    <>
      <TextFormField
        control={control}
        name="venueName"
        label="Indirizzo"
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          "& .MuiInputBase-input": {
            cursor: "pointer",
          },
        }}
        slotProps={{
          textField: {
            readOnly: true
          }
        }}
      />
      {venueAddress && (
        <span style={{color: "#d551b6", fontSize: "11px"}}>Coordinate selezionate: {normalizedCoordinates}</span>
      )}
      <VenueMapPicker
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
