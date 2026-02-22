import DialogComponent from "@components/ui/DialogComponent.tsx";
import {type ReactElement} from "react";
import {SelectFormField} from "@components";
import {
  type Fundraising,
  type PromotionFormValues,
  PromotionType,
  usePromotionForm,
  type VenuePromotionRequestDTO
} from "@pages";
import {Box} from "@mui/material";
import {useAddPromotion} from "@api";
import {useWatch} from "react-hook-form";
import {setSnackbarError} from "@store/snackbar/slice.ts";
import {useDispatch} from "react-redux";
import type {SelectMenuItem} from "@components/form/SelectFormField.tsx";

type PromotionDialogProps = {
  isDialogOpen: boolean;
  onClose: () => void;
  fundraising?: Fundraising;
}

export default function PromotionDialog({
                                          isDialogOpen,
                                          onClose,
                                          fundraising,
                                        }: PromotionDialogProps): ReactElement {

  const dispatch = useDispatch();
  if (!fundraising) {
    dispatch(setSnackbarError("Errore nella gestione della promozione!"));
    return <></>;
  }

  const {mutate: addPromotion} = useAddPromotion();

  const {form} = usePromotionForm();
  const {control, handleSubmit} = form;

  const selectedPromotion = useWatch({
    control,
    name: "venuePromotion"
  });

  const onSubmit = (values: PromotionFormValues) => {
    const payload = {
      promotion: values.venuePromotion
    } as VenuePromotionRequestDTO
    addPromotion(
      {
        fundraisingId: fundraising.fundraisingId,
        payload
      }
    );
    onClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  }

  const promotionSelectOptions: SelectMenuItem[] = Object.entries(PromotionType).map(
    ([key, value]) => ({
      label: value,
      value: key
    })
  );

  return (
    <DialogComponent
      title="Aggiungi una promozione come esercente"
      isOpen={isDialogOpen}
      onClose={onClose}
      actions={[
        {
          onClick: handleClose,
          label: 'Annulla'
        },
        {
          onClick: handleSubmit(onSubmit),
          disabled: selectedPromotion === null || selectedPromotion === "NONE",
          label: "Aggiungi"
        }
      ]}
      maxWidth="sm"
    >
      <Box display="flex" gap={3}>
        <form onSubmit={handleSubmit(onSubmit)} style={{flex: 1}}>
          <Box display="flex" flexDirection="column" gap={2} sx={{minWidth: '100px'}}>
            <SelectFormField
              name="venuePromotion"
              control={control}
              label="Promozione"
              menuItems={promotionSelectOptions}
            />
          </Box>
        </form>
      </Box>
    </DialogComponent>
  );
};