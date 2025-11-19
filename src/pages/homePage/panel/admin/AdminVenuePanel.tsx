import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useEffect} from "react";
import {usePopup} from "@components/context/PopupContextProvider.tsx";
import {banUser, unbanUser} from "@pages/homePage/api/admin.ts";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/UserCardComponent.tsx";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import {useGetVenues} from "@pages/homePage/hooks/useGetVenues.ts";

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

const addressComponent = (venueAddress: { latitude: number, longitude: number }) => {
    return (
        <Button style={{border: "2px", borderColor: "white"}}>
            <PinDropOutlinedIcon sx={{height: "20px", color: "#fafafa"}}/>
            <Typography
                color="#fafafa"
                fontSize="12px"
                sx={{cursor: 'pointer', flexWrap: 'nowrap'}}
                onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${venueAddress.latitude},${venueAddress.longitude}`;
                    window.open(url, '_blank');
                }}
            >
                Indirizzo
            </Typography>
        </Button>
    );
}

const AdminVenuePanel = () => {
    const {data, refetch} = useGetVenues();
    const {openPopup, closePopup} = usePopup();
    const dispatch = useAppDispatch();

    const venues = data?.venues || [];
    console.log("venues", venues);

    const handleRefetchLogic = () => {
        refetch().then(() => {
        });
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
                {venues.map((venue) => {
                    const {backgroundColor, avatarColor} = getCardColors(venue.enabled);
                    return (
                        <UserCardComponent
                            backgroundCardColor={backgroundColor}
                            avatarColor={avatarColor}
                            avatarText={`${venue.name[0]}${venue.surname[0]}`}
                            primaryContent={`${venue.name} ${venue.surname} - ${venue.venueName}`}
                            secondaryContent={venue.email}
                            flagsContent={
                                [
                                    addressComponent(venue.venueAddress),
                                    bannedComponent(venue.enabled),
                                ]
                            }
                            actions={
                                [
                                    {
                                        text: venue.enabled ? "Banna" : "Abilita",
                                        onConfirm: () => handleEnableUser(venue.enabled, venue.userId)
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

export default AdminVenuePanel;
