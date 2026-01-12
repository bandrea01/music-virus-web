import {type ReactElement, useState} from "react";
import {DialogComponent} from "@components";
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

    const [amount, setAmount] = useState<number>(0);
    const {mutate: deposit} = useDeposit();
    const {errors, helperText} = useDepositHelper(amount);



    return (
        <DialogComponent
            isOpen={isOpen}
            onClose={onClose}
            title="Esegui deposito sul conto"
            actions={[
                {
                    label: "Chiudi",
                    onClick: onClose,
                },
                {
                    label: "Deposita",
                    onClick: () => {
                        deposit({amount});
                        onClose();
                    }
                }
            ]}
        >
            <TextField
                label="Importo da depositare (€)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                margin="normal"
                variant="outlined"
                error={errors}
                helperText={helperText}
                fullWidth
            />
        </DialogComponent>
    );
}