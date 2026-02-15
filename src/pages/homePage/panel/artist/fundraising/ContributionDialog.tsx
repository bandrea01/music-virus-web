import DialogComponent from "@components/ui/DialogComponent.tsx";
import {type ReactElement} from "react";
import {CheckboxFormField, TextFormField} from "@components";
import {type Fundraising, useContributionForm} from "@pages";
import {Box} from "@mui/material";
import {mapContributionFormValuesToDTO} from "@utils";
import {useContribution} from "@api";

type ContributionDialogProps = {
  isDialogOpen: boolean;
  onClose: () => void;
  fundraising?: Fundraising;
  userId: string;
}

export default function ContributionDialog({
                                             isDialogOpen,
                                             onClose,
                                             fundraising,
                                             userId
                                           }: ContributionDialogProps): ReactElement {

  const {mutate: doContribution} = useContribution();

  const {form} = useContributionForm();
  const {control, handleSubmit} = form;


  const onSubmit = (values: any) => {
    const dto = mapContributionFormValuesToDTO(
      fundraising?.fundraisingId ?? '',
      fundraising?.artistId ?? '',
      userId,
      values,
    );
    doContribution(dto);
    onClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  }

  return (
    <DialogComponent
      title="Contribuisci alla raccolta fondi"
      isOpen={isDialogOpen}
      onClose={onClose}
      actions={[
        {
          onClick: handleClose,
          label: 'Annulla'
        },
        {
          onClick: handleSubmit(onSubmit),
          label: "Contribuisci"
        }
      ]}
      maxWidth="sm"
    >
      <Box display="flex" gap={3}>
        <form onSubmit={handleSubmit(onSubmit)} style={{flex: 1}}>
          <Box display="flex" flexDirection="column" gap={2} sx={{minWidth: '100px'}}>
            <TextFormField
              name="amount"
              control={control}
              label="Importo contributo €"
              placeholder="Importo (€)"
              required
            />
            <CheckboxFormField
              name="contributionVisibility"
              control={control}
              label="Contributo pubblico"
            />
          </Box>
        </form>
      </Box>
    </DialogComponent>
  );
}
;