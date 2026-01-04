import {DatePickerFormField, DialogComponent, SelectFormField, SliderFormField} from "@components";
import type {ReactElement} from "react";
import {Box} from "@mui/material";
import {mapTaxFormValuesToDTO} from "@utils";
import {useAdminCreateTax, useAdminEditTax} from "@api";
import {type AddEditTaxFormValues, useAddEditTaxForm} from "@pages/homePage/form/taxForm.ts";
import {type Tax, TaxNameEnum} from "@pages";

type AddEditTaxDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    tax?: Tax;
};

export default function AddEditTaxDialog({
                                                 isOpen,
                                                 onClose,
                                                 tax,
                                             }: AddEditTaxDialogProps): ReactElement {

    const {mutate: createTax} = useAdminCreateTax();
    const {mutate: editTax} = useAdminEditTax();

    //form
    const isEditMode = Boolean(tax);
    const { form } = useAddEditTaxForm({ tax });
    const { control, handleSubmit } = form;

    const taxNameOptions = [
        { value: TaxNameEnum.EVENT_TAX, label: "Tassa sulla conferma dell'evento" },
    ];

    const onSubmit = (values: AddEditTaxFormValues) => {
        if(tax) {
            editTax({
                feePlanId: tax.feePlanId,
                payload: mapTaxFormValuesToDTO(tax.feePlanId ?? '', values)
            });
        }
        else {
            createTax(mapTaxFormValuesToDTO('', values));
        }
        form.reset();
        onClose();
    };

    return (
        <DialogComponent
            title={isEditMode ? "Modifica tassazione" : "Aggiungi una nuova tassazione"}
            isOpen={isOpen}
            onClose={() => {
                form.reset();
                onClose();
            }}
            actions={[
                { label: "Annulla", onClick: () => {onClose(); form.reset()} },
                { label: "Salva", onClick: () => handleSubmit(onSubmit)(), variant: "contained" },
            ]}
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2} padding={2}>
                    <SelectFormField
                        name="taxName"
                        control={control}
                        menuItems={taxNameOptions}
                        placeholder="Inserisci il nome della tassa"
                        label="Nome tassa"
                        required
                    />
                    <SliderFormField
                        name="percentageOnTotal"
                        control={control}
                        label="Importo tariffa (%)"
                        min={1}
                        max={100}
                        step={1}
                        sx={{overflow: 'hidden'}}
                    />
                    <DatePickerFormField
                        name="activeSince"
                        control={control}
                        label="Attivo da"
                        withTime={false}
                        disablePast
                    />
                </Box>
            </form>
        </DialogComponent>
    );
}
