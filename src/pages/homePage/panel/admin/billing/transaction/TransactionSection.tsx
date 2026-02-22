import {PanelPaperComponent, TransactionCardComponent, useAuth} from "@components";
import {useGetAllPersonalTransactions} from "@api";
import {Typography} from "@mui/material";

export default function TransactionSection() {

  const {authUser} = useAuth();

  const {data: transactions} = useGetAllPersonalTransactions(authUser?.userId!);

  return (
    <PanelPaperComponent subtitle="Transazioni conto">
      {transactions?.length === 0 ? (
        <Typography variant="h6" color="white" align="center" mt={4}>
        Nessuna transazione trovata.
        </Typography>
      ) : (
        transactions?.map((transaction) => (
          <TransactionCardComponent transaction={transaction} key={transaction.transactionId}/>
        ))
      )}
    </PanelPaperComponent>
  )
}