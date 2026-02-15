import {type ReactElement, useState} from "react";
import {DialogComponent, useAuth} from "@components";
import {TextField} from "@mui/material";
import {useDeposit} from "@api/hooks/useBilling.ts";
import useDepositHelper from "@pages/homePage/panel/common/profile/bankAccount/useDepositHelper.tsx";

type DepositDialogProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositDialog({
                                        isOpen,
                                        onClose,
                                      }: DepositDialogProps): ReactElement {

  const {authUser} = useAuth();

  const [amount, setAmount] = useState<string>("");
  const {mutate: deposit} = useDeposit(authUser?.userId);
  const {errors, helperText} = useDepositHelper(amount);

  return (
    <DialogComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Deposita sul conto"
      actions={[
        {
          label: "Chiudi",
          onClick: onClose,
        },
        {
          label: "Deposita",
          disabled: errors || amount === 0,
          onClick: () => {
            const parsedAmount = Number(amount);
            if (!isNaN(parsedAmount) && parsedAmount > 0) {
              deposit({ amount: parsedAmount });
              onClose();
            }
          }
        }
      ]}
    >
      <TextField
        label="Importo da depositare (€)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
        variant="outlined"
        error={errors}
        helperText={helperText}
        fullWidth
        inputProps={{
          step: "0.01",
          min: "0",
        }}
      />
    </DialogComponent>
  );
}