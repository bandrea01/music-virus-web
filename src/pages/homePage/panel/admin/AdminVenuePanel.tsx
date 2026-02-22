import PanelPaperComponent from "@components/ui/PanelPaperComponent.tsx";
import {Box, Button, Typography} from "@mui/material";
import {type ReactElement, useEffect} from "react";
import {usePopup} from "@components/providers/PopupContextProvider.tsx";
import {banUser, unbanUser} from "@pages/homePage/api/admin.ts";
import {useAppDispatch} from "@store/hook.ts";
import {setSnackbarSuccess} from "@store/snackbar/slice.ts";
import UserCardComponent from "@components/domain/UserCardComponent.tsx";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import {useAdminVenues} from "@api";

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

const addressComponent = (venueAddress: { latitude: number, longitude: number }) => {
  return (
    <Button style={{border: "2px", borderColor: "white"}}>
      <PinDropOutlinedIcon sx={{height: "20px", color: "#dd84ff"}}/>
      <Typography
        color={"#dd84ff"}
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

export default function AdminVenuePanel(): ReactElement {
  const {data, refetch} = useAdminVenues();
  const {openPopup, closePopup} = usePopup();
  const dispatch = useAppDispatch();

  const venues = data?.venues || [];

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
      {
        venues.length === 0 && (
          <Typography variant="h6" color="white" align="center" mt={4}>
            Nessun esercente registrato
          </Typography>
        )
      }
      <Box display="grid" gap={2} p={2} sx={{flex: 1, overflowY: 'auto'}}>
        {venues.map((venue) => {
          const {backgroundColor, avatarColor} = getCardColors(venue.enabled as boolean);
          return (
            <UserCardComponent
              key={venue.userId}
              backgroundCardColor={backgroundColor}
              avatarColor={avatarColor}
              avatarText={`${venue.name[0]}${venue.surname[0]}`}
              primaryContent={`${venue.name} ${venue.surname} - ${venue.venueName}`}
              secondaryContent={venue.email}
              flagsContent={
                [
                  addressComponent(venue.venueAddress),
                  bannedComponent(venue.enabled as boolean),
                ]
              }
              actions={
                [
                  {
                    text: venue.enabled ? "Banna" : "Abilita",
                    onConfirm: () => handleEnableUser(venue.enabled as boolean, venue.userId),
                    startIcon: venue.enabled ? <NotInterestedIcon/> : <HowToRegOutlinedIcon/>
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