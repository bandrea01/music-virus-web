import {type ReactElement, useState} from "react";
import {ScreenSpinner, PanelPaperComponent, useAuth} from "@components";
import {Box, Button, Typography} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {formatDateWithTime} from "@utils";
import {useGetBankAccount} from "@api";
import {DepositDialog} from "@pages";


export default function BankAccountSection(): ReactElement {
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

    const {authUser} = useAuth();
    const {data: bankAccount, isLoading: isBankAccountLoading} = useGetBankAccount(authUser?.userId);

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
                                            <Typography color="white" fontWeight="bold" fontSize="20px">
                                                Saldo conto: {bankAccount?.balance} €
                                            </Typography>
                                            <Typography color="white" fontWeight="bold" fontSize="10px">
                                                Ultimo
                                                aggiornamento: {bankAccount?.lastUpdate && formatDateWithTime(bankAccount?.lastUpdate ?? "")}
                                            </Typography>
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
                        <Box>
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
                    account={bankAccount!}
                />
            )}
        </PanelPaperComponent>
    )
}