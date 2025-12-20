import {Button} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditIcon from '@mui/icons-material/Edit';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import {FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";
import {confirmFundraisingAndCreateEvent, useCancelFundraising} from "@pages/homePage/hooks/useFundraising.ts";
import type {Fundraising} from "@pages";

export const ArtistFundraisingCardActionsEnum = {
    CONFIRM_FUNDRAISING: "CONFIRM_FUNDRAISING",
    CANCEL_FUNDRAISING: "CANCEL_FUNDRAISING",
    EDIT_FUNDRAISING: "EDIT_FUNDRAISING",
    VIEW_DONATIONS: "VIEW_DONATIONS",
} as const;

type ArtistFundraisingActionKey = keyof typeof ArtistFundraisingCardActionsEnum;
type ArtistFundraisingActionProps = {
    fundraising: Fundraising;
    setOpenEditDialog?: (open: boolean) => void;
    setSelectedFundraising?: (fundraising: Fundraising) => void;
};

const ArtistFundraisingConfirmAction: React.FC<ArtistFundraisingActionProps> = ({fundraising}) => {
    const {mutate: confirmFundraising} = confirmFundraisingAndCreateEvent();
    return (
        <Button
            startIcon={<ConfirmationNumberIcon/>}
            onClick={() => {
                confirmFundraising(fundraising.fundraisingId);
            }}
            sx={{fontSize: "10px !important", backgroundColor: "#224e24 !important"}}
        >
            Conferma
        </Button>
    );
};

const ArtistFundraisingCancelAction: React.FC<ArtistFundraisingActionProps> = ({fundraising}) => {
    const {mutate: cancelFundraising} = useCancelFundraising();
    return (
        <Button
            onClick={() => {
                cancelFundraising(fundraising.fundraisingId);
            }}
            startIcon={<DeleteIcon/>}
            sx={{fontSize: "10px !important", backgroundColor: "#7a1c1c !important"}}
        >
            Annulla
        </Button>
    );
};

const ArtistFundraisingEditAction: React.FC<ArtistFundraisingActionProps> = ({fundraising, setOpenEditDialog, setSelectedFundraising}) => {
    return (
        <Button
            onClick={() => {
                setOpenEditDialog?.(true)
                setSelectedFundraising?.(fundraising);
            }}
            startIcon={<EditIcon/>}
            sx={{fontSize: "10px !important"}}

        >
            Modifica
        </Button>
    );
};

const ArtistFundraisingViewDonationsAction: React.FC<ArtistFundraisingActionProps> = ({}) => {
    // const navigate = useNavigate();
    //TODO
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

const actionComponent: Record<ArtistFundraisingActionKey, React.FC<ArtistFundraisingActionProps>> = {
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
    ],
    [FundraisingStatusEnum.ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "VIEW_DONATIONS",
        "EDIT_FUNDRAISING",
        "CONFIRM_FUNDRAISING"
    ],
    [FundraisingStatusEnum.NOT_ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
        "VIEW_DONATIONS"
    ],
    [FundraisingStatusEnum.CONFIRMED]: [
        "VIEW_DONATIONS"
    ],
    [FundraisingStatusEnum.CANCELLED]: [],
};

export function getActionsFromStatus(
    fundraising: Fundraising,
    setOpenEditDialog: (open: boolean) => void,
    setSelectedFundraising: (fundraising: Fundraising) => void,
): React.ReactNode[] {
    const actions = actionsByStatus[fundraising.status as FundraisingStatusKey] ?? [];

    return actions.map((actionKey) => {
        const ActionComponent = actionComponent[actionKey];
        return (
            <ActionComponent
                key={actionKey}
                fundraising={fundraising}
                setOpenEditDialog={setOpenEditDialog}
                setSelectedFundraising={setSelectedFundraising}
            />
        );
    });
}
