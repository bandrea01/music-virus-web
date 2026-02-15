import {PanelPaperComponent, useAuth} from "@components";
import {useGetTransactions} from "@api";

export default function TransactionSection() {

  const {authUser} = useAuth();

  const {data: transactions} = useGetTransactions(authUser?.userId!);
  console.log(transactions);

  return (
      <PanelPaperComponent subtitle="Transazioni conto"/>
  )
}