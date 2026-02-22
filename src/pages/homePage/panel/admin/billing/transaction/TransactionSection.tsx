import {PanelPaperComponent, TransactionCardComponent, useAuth} from "@components";
import {useGetAllPersonalTransactions} from "@api";

export default function TransactionSection() {

  const {authUser} = useAuth();

  const {data: transactions} = useGetAllPersonalTransactions(authUser?.userId!);

  return (
    <PanelPaperComponent subtitle="Transazioni conto">
      {transactions?.length === 0 ? (
        <p>Nessuna transazione trovata.</p>
      ) : (
        transactions?.map((transaction) => (
          <TransactionCardComponent transaction={transaction} key={transaction.transactionId}/>
        ))
      )}
    </PanelPaperComponent>
  )
}