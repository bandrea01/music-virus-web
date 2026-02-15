import {Button} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import React from "react";
import {FundraisingStatusEnum, type FundraisingStatusKey} from "@utils";
import {confirmFundraisingAndCreateEvent, useCancelFundraising} from "@api/hooks/useFundraising.ts";
import type {Fundraising} from "@pages";

export const ArtistFundraisingCardActionsEnum = {
    CONTRIBUTE_FUNDRAISING: "CONTRIBUTE_FUNDRAISING",
    CONFIRM_FUNDRAISING: "CONFIRM_FUNDRAISING",
    CANCEL_FUNDRAISING: "CANCEL_FUNDRAISING",
    EDIT_FUNDRAISING: "EDIT_FUNDRAISING",
} as const;

type ArtistFundraisingActionKey = keyof typeof ArtistFundraisingCardActionsEnum;
type ArtistFundraisingActionProps = {
    fundraising: Fundraising;
    setOpenEditDialog?: (open: boolean) => void;
    setOpenContributionDialog?: (open: boolean) => void;
    setSelectedFundraising?: (fundraising: Fundraising) => void;
};

const ArtistFundraisingContributeAction: React.FC<ArtistFundraisingActionProps> = ({fundraising, setOpenContributionDialog, setSelectedFundraising}) => {
    return (
        <Button
            startIcon={<CardGiftcardIcon/>}
            onClick={() => {
                setOpenContributionDialog?.(true);
                setSelectedFundraising?.(fundraising);
            }}
            sx={{fontSize: "10px !important", backgroundColor: "#b155e7 !important"}}
        >
            Contribuisci
        </Button>
    );
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

const actionComponent: Record<ArtistFundraisingActionKey, React.FC<ArtistFundraisingActionProps>> = {
    CONTRIBUTE_FUNDRAISING: ArtistFundraisingContributeAction,
    CONFIRM_FUNDRAISING: ArtistFundraisingConfirmAction,
    CANCEL_FUNDRAISING: ArtistFundraisingCancelAction,
    EDIT_FUNDRAISING: ArtistFundraisingEditAction,
};

const personalActionsByStatus: Partial<Record<FundraisingStatusKey, ArtistFundraisingActionKey[]>> = {
    [FundraisingStatusEnum.ACTIVE]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
    ],
    [FundraisingStatusEnum.ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
        "CONFIRM_FUNDRAISING"
    ],
    [FundraisingStatusEnum.NOT_ACHIEVED]: [
        "CANCEL_FUNDRAISING",
        "EDIT_FUNDRAISING",
    ],
    [FundraisingStatusEnum.CONFIRMED]: [],
    [FundraisingStatusEnum.CANCELLED]: [],
};
const generalActionsByStatus: Partial<Record<FundraisingStatusKey, ArtistFundraisingActionKey[]>> = {
    [FundraisingStatusEnum.ACTIVE]: ["CONTRIBUTE_FUNDRAISING"],
    [FundraisingStatusEnum.ACHIEVED]: [],
    [FundraisingStatusEnum.NOT_ACHIEVED]: [],
    [FundraisingStatusEnum.CONFIRMED]: [],
    [FundraisingStatusEnum.CANCELLED]: [],
};


export function getActionsFromStatus(
    fundraising: Fundraising,
    setOpenEditDialog: (open: boolean) => void,
    setOpenContributionDialog: (open: boolean) => void,
    setSelectedFundraising: (fundraising: Fundraising) => void,
    isInPersonalPanel: boolean,
): React.ReactNode[] {
    let actions = [];

    if (isInPersonalPanel) {
        actions = personalActionsByStatus[fundraising.status as FundraisingStatusKey] ?? [];
    } else {
        actions = generalActionsByStatus[fundraising.status as FundraisingStatusKey] ?? [];
    }

    return actions.map((actionKey) => {
        const ActionComponent = actionComponent[actionKey];
        return (
            <ActionComponent
                key={actionKey}
                fundraising={fundraising}
                setOpenEditDialog={setOpenEditDialog}
                setOpenContributionDialog={setOpenContributionDialog}
                setSelectedFundraising={setSelectedFundraising}
            />
        );
    });
}
