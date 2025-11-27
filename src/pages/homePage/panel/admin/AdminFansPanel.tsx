import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box, Typography} from "@mui/material";
import {useEffect} from "react";
import {usePopup} from "@components/context/PopupContextProvider.tsx";
import {banUser, unbanUser} from "@pages/homePage/api/admin.ts";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/UserCardComponent.tsx";
import {useGetUsers} from "@pages/homePage/hooks/useGetUsers.ts";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

const getCardColors = (enabled: boolean) => {
    const backgroundColor = enabled ? '#132543' : '#242835';
    const avatarColor = enabled ? '#274b7a' : '#202133';
    return {backgroundColor, avatarColor};
}

const bannedComponent = (banned: boolean) => {
    const color = banned ? "#0dd329" : "#dc5858";
    const written = banned ? "Abilitato" : "Bannato";
    return (
        <>
            <Typography fontSize="15px" color={color} fontWeight="bold">
                •
            </Typography>
            <Typography fontSize="15px" color={color}>
                {written}
            </Typography>
        </>
    );
}

const AdminFansPanel = () => {
    const {data, refetch} = useGetUsers();
    const {openPopup, closePopup} = usePopup();
    const dispatch = useAppDispatch();

    const fans = data?.fans || [];

    const handleRefetchLogic = () => {
        refetch().then(() => {});
        closePopup();
        dispatch(setSnackbarSuccess("Azione eseguita correttamente!"))
    }

    const handleEnableUser = (isEnabled: boolean, userId: string) => {
        openPopup({
            title: isEnabled ? "Banna Utente" : "Abilita Utente",
            message: isEnabled ? "Sei sicuro di voler bannare questo utente?" : "Sei sicuro di voler abilitare questo utente?",
            onConfirmFn: async () => {
                isEnabled ? await banUser(userId) : await unbanUser(userId);
                handleRefetchLogic();
            },
            confirmLabel: "Conferma",
            confirmButtonVariant: "contained",
            cancelLabel: "Annulla",
            cancelButtonVariant: "text",
        });
    }

    useEffect(() => {
        refetch().then(() => {
        });
    }, []);

    return (
        <PanelPaperComponent
            title="Gestione Esercenti"
        >
            <Box display="grid" gap={2} p={2} sx={{flex: 1, overflowY: 'auto'}}>
                {fans.map((fan) => {
                    const {backgroundColor, avatarColor} = getCardColors(fan.enabled);
                    return (
                        <UserCardComponent
                            backgroundCardColor={backgroundColor}
                            avatarColor={avatarColor}
                            avatarText={`${fan.name[0]}${fan.surname[0]}`}
                            primaryContent={`${fan.name} ${fan.surname}`}
                            secondaryContent={fan.email}
                            flagsContent={[bannedComponent(fan.enabled)]}
                            actions={
                                [
                                    {
                                        text: fan.enabled ? "Banna" : "Abilita",
                                        onConfirm: () => handleEnableUser(fan.enabled, fan.userId),
                                        startIcon: fan.enabled ? <NotInterestedIcon/> : <HowToRegOutlinedIcon/>
                                    }
                                ]
                            }
                        />
                    )
                })};
            </Box>
        </PanelPaperComponent>
    );
}

export default AdminFansPanel;
