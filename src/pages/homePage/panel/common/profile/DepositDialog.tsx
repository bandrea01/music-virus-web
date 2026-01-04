import {type ReactElement, useState} from "react";
import {DialogComponent} from "@components";
import type {Account} from "@pages";
import {TextField} from "@mui/material";
import {useDeposit} from "@api/hooks/useBilling.ts";

type DepositDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    account: Account;
}

export default function DepositDialog({
                                          isOpen,
                                          onClose,
                                          account
                                      }: DepositDialogProps): ReactElement {

    const [amount, setAmount] = useState<number>(0);
    const {mutate: deposit} = useDeposit();

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
                        deposit({
                            accountId: account.accountId,
                            payload: {amount: amount}
                        });
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
                fullWidth
            />
        </DialogComponent>
    );
}