import {type ReactElement} from "react";
import {PanelPaperComponent, TransactionCardComponent, useAuth} from "@components";
import {Box} from "@mui/material";
import {useGetLast10PersonalTransactions} from "@api";
import {TransactionType} from "@pages";

export default function TransactionPanel(): ReactElement {

  const {authUser} = useAuth();
  const {data: transactions} = useGetLast10PersonalTransactions(authUser?.userId ?? "");

  //if user is the receiver of a contribution payment we should delete the transaction from the list
  const filteredTransactions = transactions?.filter(transaction =>
    !(transaction.transactionType === TransactionType.CONTRIBUTION_PAYMENT && transaction.receiverId === authUser?.userId)
  );

  return (
    <PanelPaperComponent
      title="Movimenti conto"
    >
      <Box display="flex" flexDirection="column" gap={1}>
        {filteredTransactions?.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={4}>
            Non hai ancora effettuato nessuna transazione
          </Box>
        ) : (
          filteredTransactions?.map((transaction) => (
            <TransactionCardComponent transaction={transaction} key={transaction.transactionId}/>
          ))
        )}
      </Box>
    </PanelPaperComponent>
  );
}