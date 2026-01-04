import {type ReactElement, useState} from "react";
import {FullScreenSpinner, PanelPaperComponent} from "@components";
import {Box, Divider, Typography} from "@mui/material";
import {
    AddEditSubscriptionDialog, AddEditTaxDialog,
    type Subscription, SubscriptionCard,
    type Tax, TaxCard,
} from "@pages";
import {useAdminSubscriptions, useAdminTaxes} from "@api";
import type {ActionProps} from "@utils";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";


export default function FeeSection(): ReactElement {

    const [isAddEditSubscriptionDialogOpen, setIsAddEditSubscriptionDialogOpen] = useState<boolean>(false);
    const [isAddEditTaxDialogOpen, setIsAddEditTaxDialogOpen] = useState<boolean>(false);
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);
    const [selectedTax, setSelectedTax] = useState<Tax | undefined>(undefined);

    const {data: subscriptions, isLoading: isFeePlansLoading} = useAdminSubscriptions();
    const {data: taxes, isLoading: isTaxesLoading} = useAdminTaxes();
    const isSubscriptionsEmpty = subscriptions && subscriptions.length === 0;
    const isTaxesEmpty = taxes && taxes.length === 0;

    const feeActions: ActionProps[] = [
        {
            label: "Aggiungi tassa",
            startIcon: <LocalAtmIcon/>,
            onClick: () => {
                setIsAddEditTaxDialogOpen(true);
            }
        },
        {
            label: "Aggiungi piano",
            startIcon: <CurrencyExchangeIcon/>,
            onClick: () => {
                setIsAddEditSubscriptionDialogOpen(true);
            },
        }
    ];

    return (
        <PanelPaperComponent
            subtitle="Piani tariffari"
            actions={feeActions}
        >
            {/*Subscriptions*/}
            {
                isFeePlansLoading ?
                    (<FullScreenSpinner/>) :
                    isSubscriptionsEmpty ?
                        (
                            <Typography color="white">Nessun piano tariffario impostato.</Typography>
                        ) :
                        (
                            <Box sx={{display: "grid", gridTemplateColumns: '1fr 1fr', gap: 2}}>
                                {subscriptions?.map((subscription: Subscription) => (
                                    <SubscriptionCard
                                        key={subscription.feePlanId}
                                        subscription={subscription}
                                        onClick={() => {
                                            setSelectedSubscription(subscription);
                                            setIsAddEditSubscriptionDialogOpen(true)
                                        }}
                                    />
                                ))}
                            </Box>
                        )
            }
            <Divider sx={{my: 2, borderColor: '#212c40'}}/>
            {/*Taxes*/}
            {
                isTaxesLoading ?
                    (<FullScreenSpinner/>) :
                    isTaxesEmpty ?
                        (
                            <Typography color="white">Nessuna tassa impostata.</Typography>
                        ) :
                        (
                            <Box sx={{display: "flex", flexDirection: 'column', gap: 2}}>
                                {taxes?.map((tax) => (
                                    <TaxCard
                                        key={tax.feePlanId}
                                        tax={tax}
                                        onClick={() => {
                                            setSelectedTax(tax);
                                            setIsAddEditTaxDialogOpen(true)
                                        }}
                                    />
                                ))}
                            </Box>
                        )
            }
            {
                isAddEditSubscriptionDialogOpen && (
                    <AddEditSubscriptionDialog
                        isOpen={isAddEditSubscriptionDialogOpen}
                        onClose={() => {
                            setIsAddEditSubscriptionDialogOpen(false);
                            setSelectedSubscription(undefined);
                        }}
                        subscription={selectedSubscription}
                    />
                )
            }
            {
                isAddEditTaxDialogOpen && (
                    <AddEditTaxDialog
                        isOpen={isAddEditTaxDialogOpen}
                        onClose={() => {
                            setIsAddEditTaxDialogOpen(false);
                            setSelectedTax(undefined);
                        }}
                        tax={selectedTax}
                    />
                )
            }
        </PanelPaperComponent>
    );
}