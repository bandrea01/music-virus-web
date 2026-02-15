import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Typography} from "@mui/material";
import {type ReactElement, useEffect} from "react";
import {usePopup} from "@components/providers/PopupContextProvider.tsx";
import {banUser, unbanUser} from "@pages/homePage/api/admin.ts";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/domain/UserCardComponent.tsx";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import {useAdminFans} from "@api";

const getCardColors = (enabled: boolean) => {
  const backgroundColor = enabled ? '#132543' : '#242835';
  const avatarColor = enabled ? '#274b7a' : '#202133';
  return {backgroundColor, avatarColor};
}

const bannedComponent = (enabled: boolean) => {
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
}

export default function AdminFansPanel(): ReactElement {
  const {data, refetch} = useAdminFans();
  const {openPopup, closePopup} = usePopup();
  const dispatch = useAppDispatch();

  const fans = data?.fans || [];

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
        //TODO: refetch logic (ban should invalidate)
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
      title="Gestione Fans"
    >
      {
        fans.length === 0 && (
          <Typography variant="body1" color="white" align="center" mt={4}>
            Nessun fan registrato
          </Typography>
        )
      }
      <Box display="grid" gap={2} p={2} sx={{flex: 1, overflowY: 'auto'}}>
        {fans.map((fan) => {
          const {backgroundColor, avatarColor} = getCardColors(fan.enabled as boolean);
          return (
            <UserCardComponent
              key={fan.userId}
              backgroundCardColor={backgroundColor}
              avatarColor={avatarColor}
              avatarText={`${fan.name[0]}${fan.surname[0]}`}
              primaryContent={`${fan.name} ${fan.surname}`}
              secondaryContent={fan.email}
              flagsContent={[bannedComponent(fan.enabled as boolean)]}
              actions={
                [
                  {
                    text: fan.enabled ? "Banna" : "Abilita",
                    onConfirm: () => handleEnableUser(fan.enabled as boolean, fan.userId),
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
};