import {type ReactElement} from "react";
import {PanelPaperComponent, TransactionCardComponent, useAuth} from "@components";
import {Box, Typography} from "@mui/material";
import {useGetAllPersonalTransactions} from "@api";
import {TransactionType} from "@pages";

export default function TransactionPanel(): ReactElement {

  const {authUser} = useAuth();
  const {data: transactions} = useGetAllPersonalTransactions(authUser?.userId ?? "");

  //if user is the receiver of a contribution payment we should delete the transaction from the list
  const filteredTransactions = transactions
    ? transactions
      .filter(transaction => {
        const baseCondition = !(transaction.transactionType === TransactionType.CONTRIBUTION_PAYMENT && transaction.receiverId === authUser?.userId);
        const isArtist = authUser?.role === "ROLE_ARTIST";
        if (isArtist) return transaction.transactionType !== TransactionType.REFUND && baseCondition;
        return baseCondition;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : undefined;

  return (
    <PanelPaperComponent
      title="Movimenti conto"
    >
      <Box display="flex" flexDirection="column" gap={1}>
        {filteredTransactions?.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="h6" color="white" align="center" mt={4}>
              Non hai ancora effettuato nessuna transazione
            </Typography>
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