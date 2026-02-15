import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Chip, Typography} from "@mui/material";
import {usePopup} from "@components/providers/PopupContextProvider.tsx";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/domain/UserCardComponent.tsx";
import {sortArtists} from "@/utils";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import type {ReactElement} from "react";
import {
  useAdminApproveArtist,
  useAdminArtists,
  useAdminBanUser,
  useAdminUnapproveArtist,
  useAdminUnbanUser
} from "@api";

const getCardColors = (approved: boolean, enabled: boolean) => {
  const backgroundColor = enabled ? '#132543' : '#242835';
  const borderColor = (approved || !enabled) ? '' : 'rgba(191,157,60,0.67)';
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
};

const enabledStatusComponent = (enabled: boolean) => {
  const color = enabled ? "#0dd329" : "#dc5858";
  const written = enabled ? "Abilitato" : "Bannato";
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
};

export default function AdminArtistPanel(): ReactElement {
  const {data} = useAdminArtists();
  const {openPopup, closePopup} = usePopup();
  const dispatch = useAppDispatch();

  const {mutate: banUser} = useAdminBanUser();
  const {mutate: unbanUser} = useAdminUnbanUser();
  const {mutate: approveArtist} = useAdminApproveArtist();
  const {mutate: unapproveArtist} = useAdminUnapproveArtist();

  const datas = data?.artists || [];
  const artists = sortArtists(datas);

  const handleAfterMutation = () => {
    closePopup();
    dispatch(setSnackbarSuccess("Azione eseguita correttamente!"));
  };

  const handleEnableArtist = (isEnabled: boolean, userId: string) => {
    openPopup({
      title: isEnabled ? "Banna Utente" : "Abilita Utente",
      message: isEnabled
        ? "Sei sicuro di voler bannare questo utente?"
        : "Sei sicuro di voler abilitare questo utente?",
      onConfirmFn: () => {
        if (isEnabled) {
          banUser(userId, {onSuccess: handleAfterMutation});
        } else {
          unbanUser(userId, {onSuccess: handleAfterMutation});
        }
      },
      confirmLabel: "Conferma",
      confirmButtonVariant: "contained",
      cancelLabel: "Annulla",
      cancelButtonVariant: "text",
    });
  };

  const handleApproveArtist = (isApproved: boolean, userId: string) => {
    openPopup({
      title: isApproved ? "Revoca approvazione" : "Approva artista",
      message: isApproved
        ? "Sei sicuro di voler revocare l'approvazione a questo artista?"
        : "Sei sicuro di voler approvare questo artista?",
      onConfirmFn: () => {
        if (isApproved) {
          unapproveArtist(userId, {onSuccess: handleAfterMutation});
        } else {
          approveArtist(userId, {onSuccess: handleAfterMutation});
        }
      },
      confirmLabel: "Conferma",
      confirmButtonVariant: "contained",
      cancelLabel: "Annulla",
      cancelButtonVariant: "text",
    });
  };

  return (
    <PanelPaperComponent title="Gestione Artisti">
      {
        artists.length === 0 && (
          <Typography variant="h6" color="white" align="center" mt={4}>
            Nessun artista registrato
          </Typography>
        )
      }
      <Box className="adminPanel" display="grid" gap={2} p={2} sx={{flex: 1, overflowY: 'auto'}}>
        {artists.map((artist) => {
          const {
            backgroundColor,
            borderColor,
            avatarColor
          } = getCardColors(artist.approved as boolean, artist.enabled as boolean);

          return (
            <UserCardComponent
              key={artist.userId}
              backgroundCardColor={backgroundColor}
              borderCardColor={borderColor}
              avatarColor={avatarColor}
              avatarText={`${artist.name[0]}${artist.surname[0]}`}
              primaryContent={`${artist.name} ${artist.surname}`}
              secondaryContent={artist.email}
              otherContent={artist.artistGenres?.map((genre: string) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  sx={{color: "#8e8e8e"}}
                />
              ))}
              flagsContent={[
                approvedComponent(artist.approved as boolean),
                enabledStatusComponent(artist.enabled as boolean),
              ]}
              actions={[
                {
                  text: artist.enabled ? "Banna" : "Abilita",
                  onConfirm: () => handleEnableArtist(artist.enabled as boolean, artist.userId),
                  startIcon: artist.enabled ? <NotInterestedIcon/> : <HowToRegOutlinedIcon/>
                },
                {
                  text: artist.approved ? "Non approvare" : "Approva",
                  onConfirm: () => handleApproveArtist(artist.approved as boolean, artist.userId),
                  startIcon: artist.approved
                    ? <RemoveCircleOutlineIcon/>
                    : <CheckCircleOutlineIcon/>
                }
              ]}
            />
          );
        })}
      </Box>
    </PanelPaperComponent>
  );
};