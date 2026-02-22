import {Box, Typography} from "@mui/material";
import {AppRoutes, formatDateWithTime, handleRedirectCardClick} from "@utils";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@store/hook.ts";
import {type Transaction, TransactionType} from "@pages";
import type {ReactElement} from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useAuth} from "@components";

type TransactionCardComponentProps = {
  transaction: Transaction;
  isAdminDashboard?: boolean;
}

function isIncomeTransaction(transaction: Transaction, personalUserId: string): boolean {
  return transaction.receiverId === personalUserId;
}

function getTransactionLabel(transactionType: string): string {
  switch (transactionType) {
    case TransactionType.EVENT_PAYMENT:
      return "Pagamento evento";
    case TransactionType.FEE_PAYMENT:
      return "Pagamento commissione";
    case TransactionType.CONTRIBUTION_PAYMENT:
      return "Pagamento contributo";
    case TransactionType.REFUND:
      return "Rimborso";
    default:
      return transactionType;
  }
}

export default function TransactionCardComponent({
                                                   transaction,
                                                   isAdminDashboard = false
                                                 }: TransactionCardComponentProps): ReactElement {
  const navigate = useNavigate();
  const {authUser} = useAuth();
  const dispatch = useAppDispatch();

  if (!authUser) {
    return <></>;
  }

  const isIncome = isIncomeTransaction(transaction, authUser.userId);

  return (
    <Box
      className="approveRequestCard"
      onClick={
        isAdminDashboard ?
          () => handleRedirectCardClick(AppRoutes.ADMIN.PAYMENTS_MANAGEMENT, navigate, dispatch)
          : undefined
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Box display="flex" alignItems="center" gap={2}>
          {isIncome ? (
            <FileDownloadIcon color="success" fontSize="large"/>
          ) : (
            <FileUploadIcon color="error" fontSize="large"/>
          )}
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography fontSize="17px" color="white" fontWeight="bold">
              {getTransactionLabel(transaction.transactionType)}
            </Typography>
            <Typography fontSize="15px" color="white">
              {formatDateWithTime(transaction.createdAt)}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Typography fontSize="17px" color={isIncome ? 'success' : 'error'} fontWeight="bold">
            {isIncome ? "+" : "-"}{transaction.amount}€
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}