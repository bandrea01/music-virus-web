import {Box, Typography} from "@mui/material";
import {AppRoutes, handleRedirectCardClick} from "@utils";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@store/hook.ts";
import type {Transaction} from "@pages";
import type {ReactElement} from "react";

type TransactionCardComponentProps = {
  transaction: Transaction;
}

export default function TransactionCardComponent({
                                                   transaction
                                                 }: TransactionCardComponentProps): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log("Rendering TransactionCardComponent with transaction:", transaction);

  return (
    <Box
      className="approveRequestCard"
      onClick={() => handleRedirectCardClick(AppRoutes.ADMIN.PAYMENTS_MANAGEMENT, navigate, dispatch)}
    >
      <Typography color='white'>transaction</Typography>
    </Box>
  );
}