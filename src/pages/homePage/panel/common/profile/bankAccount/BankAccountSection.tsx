import {type ReactElement, useState} from "react";
import {PanelPaperComponent, ScreenSpinner, useAuth} from "@components";
import {Box, Button, IconButton, Tooltip, Typography} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {formatDateWithTime} from "@utils";
import {useCreateBankAccount, useGetBankAccount} from "@api";
import {type Account, DepositDialog} from "@pages";
import AddCardIcon from '@mui/icons-material/AddCard';
import CachedIcon from '@mui/icons-material/Cached';


export default function BankAccountSection(): ReactElement {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

  const {authUser} = useAuth();

  const {
    data: bankAccount,
    isLoading: isBankAccountLoading,
    isFetching: isFetchingAccount,
    refetch: refetchAccount
  } = useGetBankAccount(authUser?.userId!);

  const {mutate: createBankAccount} = useCreateBankAccount(authUser?.userId!);

  return (
    <PanelPaperComponent subtitle="Conto">
      {isBankAccountLoading ?
        (
          <ScreenSpinner/>
        ) :
        (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <MonetizationOnIcon sx={{fontSize: "40px", color: "#cf7c25"}}/>
              <Box display="flex" flexDirection="column">
                {bankAccount ?
                  (
                    <>
                      <Typography color="white" fontWeight="bold" fontSize="20px" marginLeft="12px">
                        Saldo conto: {bankAccount?.balance} €
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => refetchAccount()}>
                          <CachedIcon
                            sx={{
                              color: "#fafafa",
                              height: "16px",
                              marginTop: "0px",
                              ...(isFetchingAccount && { animation: "spin 1s linear infinite" }),
                              onHover: {cursor: "pointer"}
                            }}
                          />
                        </IconButton>
                        <Typography color="white" fontWeight="bold" fontSize="10px" marginTop="3px">
                          Ultimo aggiornamento: {bankAccount.lastUpdatedAt && formatDateWithTime(bankAccount?.lastUpdatedAt ?? "")}
                        </Typography>
                      </Box>
                    </>
                  ) :
                  (
                    <Typography color="white" fontWeight="bold" fontSize="20px">
                      Non hai ancora un conto associato
                    </Typography>
                  )
                }
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              {
                !bankAccount && (
                  <Tooltip title="Associa conto bancario">
                    <AddCardIcon
                      onClick={() => createBankAccount()}
                      sx={{color: "#ff9c09"}}
                      cursor="pointer"
                    />
                  </Tooltip>
                )
              }
              <Button
                onClick={() => setIsDepositDialogOpen(true)}
              >
                Ricarica conto
              </Button>
            </Box>
          </Box>
        )
      }
      {isDepositDialogOpen && (
        <DepositDialog
          isOpen={isDepositDialogOpen}
          onClose={() => setIsDepositDialogOpen(false)}
        />
      )}
    </PanelPaperComponent>
  )
}