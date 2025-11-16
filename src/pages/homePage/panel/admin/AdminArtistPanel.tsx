import PanelPaperComponent from "@components/PanelPaperComponent.tsx";
import {Box, Chip, Typography} from "@mui/material";
import {useGetArtists} from "@pages/homePage/hooks/useGetArtists.tsx";
import {useEffect} from "react";
import {usePopup} from "@components/context/PopupContextProvider.tsx";
import {approveArtist, banUser, unapproveArtist, unbanUser} from "@pages/homePage/api/admin.ts";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/UserCardComponent.tsx";

const getCardColors = (approved: boolean, enabled: boolean) => {
    const backgroundColor = enabled ? '#132543' : '#242835';
    const borderColor = approved ? '' : 'rgba(191,157,60,0.4)';
    const avatarColor = enabled ? '#274b7a' : '#202133';
    return {backgroundColor, borderColor, avatarColor};
}

const approvedComponent = (approved: boolean) => {
    const color = approved ? "#0dd329" : "#eab83c";
    const written = approved ? "Approvato" : "Non approvato";
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

const AdminArtistPanel = () => {
    const {data, refetch} = useGetArtists();
    const {openPopup, closePopup} = usePopup();
    const dispatch = useAppDispatch();

    const artists = data?.artists || [];

    const handleRefetchLogic = () => {
        refetch().then(() => {});
        closePopup();
        dispatch(setSnackbarSuccess("Azione eseguita correttamente!"))
    }

    const handleEnableArtist = (isEnabled: boolean, userId: string) => {
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

    const handleApproveArtist = (isApproved: boolean, userId: string) => {
        openPopup({
            title: isApproved ? "Revoca approvazione" : "Approva artista",
            message: isApproved ? "Sei sicuro di voler revocare l'approvazione a questo artista?" : "Sei sicuro di voler approvare questo artista?",
            onConfirmFn: async () => {
                isApproved ? await unapproveArtist(userId) : await approveArtist(userId);
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
            title="Gestione Artisti"
        >
            <Box className="adminPanel" display="grid" gap={2} p={2} sx={{flex: 1, overflowY: 'auto'}}>
                {artists.map((artist) => {
                    const {backgroundColor, borderColor, avatarColor} = getCardColors(artist.approved, artist.enabled);
                    return (
                        <UserCardComponent
                            backgroundCardColor={backgroundColor}
                            borderCardColor={borderColor}
                            avatarColor={avatarColor}
                            avatarText={`${artist.name[0]}${artist.surname[0]}`}
                            primaryContent={`${artist.name} ${artist.surname}`}
                            secondaryContent={artist.email}
                            otherContent={
                                artist.artistGenres?.map((genre: string) => (
                                    <Chip
                                        key={genre}
                                        label={genre}
                                        size="small"
                                        sx={{color: "#8e8e8e"}}
                                    />
                                ))
                            }
                            flagsContent={[
                                approvedComponent(artist.approved),
                                bannedComponent(artist.enabled),
                            ]}
                            actions={
                                [
                                    {
                                        text: artist.enabled ? "Banna" : "Abilita",
                                        onConfirm: () => handleEnableArtist(artist.enabled, artist.userId)
                                    },
                                    {
                                        text: artist.approved ? "Non approvare" : "Approva",
                                        onConfirm: () => handleApproveArtist(artist.approved, artist.userId)
                                    }
                                ]
                            }
                        />
                    )
                })}
            </Box>
        </PanelPaperComponent>
    );
}

export default AdminArtistPanel;
