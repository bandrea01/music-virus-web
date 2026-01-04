import {
    CheckboxGroupFormField,
    DatePickerFormField,
    DialogComponent,
    SelectFormField,
    SliderFormField
} from "@components";
import type {ReactElement} from "react";
import {Box} from "@mui/material";
import type {SelectMenuItem} from "@components/form/SelectFormField.tsx";
import {FeePeriodEnum, mapSubscriptionFormValuesToDTO, UserTypeEnum} from "@utils";
import {useAdminCreateSubscription, useAdminDeleteSubscription, useAdminEditSubscription} from "@api";
import {type AddEditSubscriptionFormValues, useAddEditSubscriptionForm} from "@pages/homePage/form/subscriptionForm.ts";
import type {Subscription} from "@pages";

type AddEditSubscriptionDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    subscription?: Subscription;
};

function getFeePeriodMenuItems(): SelectMenuItem[] {
    return Object.entries(FeePeriodEnum).map(([key, label], index) => ({
        key: index,
        value: key,
        label,
    }));
}

export default function AddEditSubscriptionDialog({
                                                 isOpen,
                                                 onClose,
                                                 subscription,
                                             }: AddEditSubscriptionDialogProps): ReactElement {

    const {mutate: createSubscription} = useAdminCreateSubscription();
    const {mutate: editSubscription} = useAdminEditSubscription();
    const {mutate: deleteSubscription} = useAdminDeleteSubscription();

    //form
    const isEditMode = Boolean(subscription);
    const { form } = useAddEditSubscriptionForm({ subscription });
    const { control, handleSubmit } = form;

    const onSubmit = (values: AddEditSubscriptionFormValues) => {
        if(subscription) {
            editSubscription({
                feePlanId: subscription.feePlanId,
                payload: mapSubscriptionFormValuesToDTO(subscription.feePlanId ?? '', values)
            });
        }
        else {
            createSubscription(mapSubscriptionFormValuesToDTO('', values));
        }
        form.reset();
        onClose();
    };

    const onDelete = () => {
        if(subscription) {
            deleteSubscription({ feePlanId: subscription.feePlanId });
        }
        form.reset();
        onClose();
    };

    const userTypeOptions = [
        { value: UserTypeEnum.FAN, label: "Fan" },
        { value: UserTypeEnum.ARTIST, label: "Artista" },
        { value: UserTypeEnum.VENUE, label: "Esercente" },
    ];

    return (
        <DialogComponent
            title={isEditMode ? "Modifica piano tariffario" : "Aggiungi nuovo piano tariffario"}
            isOpen={isOpen}
            onClose={() => {
                form.reset();
                onClose();
            }}
            actions={[
                ...(subscription ? [{ label: "Elimina piano", onClick: () => { onDelete(); onClose(); form.reset(); } }] : []),
                { label: "Annulla", onClick: () => { onClose(); form.reset(); } },
                { label: "Salva", onClick: () => handleSubmit(onSubmit)(), variant: "contained" },
            ]}
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2} padding={2}>
                    <CheckboxGroupFormField
                        name="isApplicatedTo"
                        control={control}
                        label="Applicabile a"
                        options={userTypeOptions}
                        row={true}
                        required
                    />
                    <SelectFormField
                        name="feePeriod"
                        control={control}
                        label="Periodo di applicazione tariffa"
                        placeholder="Seleziona il periodo"
                        menuItems={getFeePeriodMenuItems()}
                        fullWidth
                        required
                    />
                    <SliderFormField
                        name="amount"
                        control={control}
                        label="Importo tariffa (€)"
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
