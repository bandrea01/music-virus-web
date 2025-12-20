import DialogComponent from "@components/DialogComponent.tsx";
import React from "react";
import {SelectFormField, type SelectMenuItem, TextFormField} from "@components";
import {
    type AddEditFundraisingFormValues,
    type Fundraising,
    useAddEditFundraisingForm,
    useEditFundraising,
    type VenueProfileDTO
} from "@pages";
import {Box} from "@mui/material";
import {DatePickerFormField} from "@components/formComponent/DatePickerFormField.tsx";
import {SliderFormField} from "@components/formComponent/SliderFormField.tsx";
import {mapFundraisingFormValuesToDTO, useCreateFundraising} from "@pages/homePage/hooks/useFundraising.ts";

type ArtistCreateFundraisingDialogProps = {
    isDialogOpen: boolean;
    onClose: () => void;
    venues: VenueProfileDTO[];
    fundraising?: Fundraising;
    userId: string;
}

function getMenuItems(venues: VenueProfileDTO[] | undefined) {
    if (!venues) return [];
    return venues.map((venue, index) => ({
        key: index,
        value: venue.userId,
        label: venue.venueName,
    })) as SelectMenuItem[];
}

const AddEditFundraisingDialog: React.FC<ArtistCreateFundraisingDialogProps> = ({
                                                                                    isDialogOpen,
                                                                                    onClose,
                                                                                    fundraising,
                                                                                    venues,
                                                                                    userId
                                                                                }: ArtistCreateFundraisingDialogProps) => {

    const {mutate: createFundraising} = useCreateFundraising();
    const {mutate: editFundraising} = useEditFundraising();

    const isEditMode = Boolean(fundraising);
    const {form} = useAddEditFundraisingForm({
        fundraising
    });
    const {control, handleSubmit} = form;


    const onSubmit = (values: AddEditFundraisingFormValues) => {
        if (fundraising) {
            editFundraising({
                fundraisingId: fundraising.fundraisingId,
                payload: mapFundraisingFormValuesToDTO(userId ?? '', values)
            });
        } else {
            createFundraising(mapFundraisingFormValuesToDTO(userId ?? '', values));
        }
        onClose();
    };

    const handleClose = () => {
        onClose();
        form.reset();
    }

    return (
        <DialogComponent
            title={isEditMode ? "Modifica la raccolta fondi" : "Crea nuova raccolta fondi"}
            isOpen={isDialogOpen}
            onClose={onClose}
            actions={[
                {
                    onClick: handleClose,
                    label: 'Annulla'
                },
                {
                    onClick: handleSubmit(onSubmit),
                    label: isEditMode ? 'Modifica raccolta fondi' : 'Crea raccolta fondi',
                }
            ]}
        >
            <Box display="flex" gap={3}>
                <Box
                    component="img"
                    src="/concert_background.png"
                    sx={{
                        height: '270px',
                        width: 'auto',
                        objectFit: 'contain',
                        borderRadius: '15px'
                    }}
                >
                </Box>
                <form onSubmit={handleSubmit(onSubmit)} style={{flex: 1}}>
                    <Box display="flex" flexDirection="column" gap={2} sx={{minWidth: '100px'}}>
                        <TextFormField
                            name="fundraisingName"
                            control={control}
                            label="Nome della raccolta fondi"
                            placeholder="Inserisci il nome della raccolta fondi"
                            fullWidth
                            required
                        />
                        <SelectFormField
                            name="venueId"
                            control={control}
                            label="Location"
                            placeholder="Seleziona una location"
                            menuItems={getMenuItems(venues)}
                            fullWidth
                            required
                        />
                        <DatePickerFormField
                            name="eventDate"
                            control={control}
                            label="Data dell'evento"
                            disablePast
                        />
                        <SliderFormField
                            name="targetAmount"
                            control={control}
                            label="Obbiettivo"
                            min={1}
                            max={500}
                            step={1}
                            sx={{overflow: 'hidden'}}
                        />
                    </Box>
                </form>
            </Box>
        </DialogComponent>
    )
        ;
}

export default AddEditFundraisingDialog;