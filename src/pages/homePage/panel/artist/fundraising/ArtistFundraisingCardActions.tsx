import {Button} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditIcon from '@mui/icons-material/Edit';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import {FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";
import {useCancelFundraising} from "@pages/homePage/hooks/useFundraising.ts";

export const ArtistFundraisingCardActionsEnum = {
    CONFIRM_FUNDRAISING: "CONFIRM_FUNDRAISING",
    CANCEL_FUNDRAISING: "CANCEL_FUNDRAISING",
    EDIT_FUNDRAISING: "EDIT_FUNDRAISING",
    VIEW_DONATIONS: "VIEW_DONATIONS",
} as const;

type ArtistFundraisingActionKey = keyof typeof ArtistFundraisingCardActionsEnum;

const ArtistFundraisingConfirmAction: React.FC = (fundraisingId: string) => {
    return (
        <Button
            startIcon={<ConfirmationNumberIcon/>}
            onClick={() => {
                // Handle confirm event action
            }}
            sx={{fontSize: "10px !important", backgroundColor: "#224e24 !important"}}
        >
            Conferma
        </Button>
    );
};

const ArtistFundraisingCancelAction: React.FC = (fundraisingId: string) => {
    const {mutate: cancelFundraising} = useCancelFundraising();
    return (
        <Button
            onClick={() => {
                cancelFundraising(fundraisingId);
            }}
            startIcon={<DeleteIcon/>}
            sx={{fontSize: "10px !important", backgroundColor: "#7a1c1c !important"}}

        >
            Annulla
        </Button>
    );
};

const ArtistFundraisingEditAction: React.FC = (fundraisingId: string) => {
    return (
        <Button
            onClick={() => {
                // Handle edit fundraising action
            }}
            startIcon={<EditIcon/>}
            sx={{fontSize: "10px !important"}}

        >
            Modifica
        </Button>
    );
};

const ArtistFundraisingViewDonationsAction: React.FC = (fundraisingId: string) => {
    return (
        <Button
            onClick={() => {
                // Handle view donations action
            }}
            sx={{fontSize: "10px !important"}}
            startIcon={<RequestQuoteIcon/>}
        >
            Donazioni
        </Button>
    );
};

const actionComponent: Record<ArtistFundraisingActionKey, React.FC> = {
    CONFIRM_FUNDRAISING: ArtistFundraisingConfirmAction,
    CANCEL_FUNDRAISING: ArtistFundraisingCancelAction,
    EDIT_FUNDRAISING: ArtistFundraisingEditAction,
    VIEW_DONATIONS: ArtistFundraisingViewDonationsAction,
};

const actionsByStatus: Partial<Record<FundraisingStatusKey, ArtistFundraisingActionKey[]>> = {
    [FundraisingStatusEnum.ACTIVE]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
        "VIEW_DONATIONS",
        "CONFIRM_FUNDRAISING",
    ],
    [FundraisingStatusEnum.ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "VIEW_DONATIONS"
    ],
    [FundraisingStatusEnum.NOT_ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
        "VIEW_DONATIONS"
    ],
    [FundraisingStatusEnum.CANCELLED]: [],
};

export function getActionsFromStatus(status: FundraisingStatusKey): React.ReactNode[] {
    const actions = actionsByStatus[status] ?? [];

    return actions.map((actionKey) => {
        const ActionComponent = actionComponent[actionKey];
        return <ActionComponent key={actionKey}/>;
    });
}
