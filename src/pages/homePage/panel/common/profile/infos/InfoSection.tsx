import {type ReactElement, useState} from "react";
import {PanelPaperComponent, useAuth} from "@components";
import {Box, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {InfoCard, PersonalProfileEditDialog} from "@pages";
import type {IProfileUserLocalStorage} from "@components/providers/AuthContext.tsx";
import EmailIcon from '@mui/icons-material/Email';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapIcon from '@mui/icons-material/Map';
import CreateIcon from "@mui/icons-material/Create";
import type {ActionProps} from "@utils";

type ProfilePageInfo = {
  nameSurname: string;
  email: string;
  artistGenres?: string[];
  artistSocial?: string
  venueName?: string;
  venueAddress?: string | { latitude: number; longitude: number } | undefined;
}

const defaultValues: ProfilePageInfo = {
  nameSurname: '',
  email: '',
  artistGenres: [],
  artistSocial: undefined,
  venueName: '',
  venueAddress: '',
}

function getProfileInfos(profileUser: IProfileUserLocalStorage): ProfilePageInfo {
  return {
    nameSurname: `${profileUser.name} ${profileUser.surname}` || defaultValues.nameSurname,
    email: profileUser.email || defaultValues.email,
    artistGenres: profileUser.artistGenres || defaultValues.artistGenres,
    artistSocial: profileUser.artistSocial || defaultValues.artistSocial,
    venueName: profileUser.venueName || defaultValues.venueName,
    venueAddress: profileUser.venueAddress || defaultValues.venueAddress,
  }
}

function formatValue(value: ProfilePageInfo[keyof ProfilePageInfo]): string {
  if (value == null) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

export default function InfoSection(): ReactElement {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {profileUser} = useAuth();
  const infos: ProfilePageInfo = getProfileInfos(profileUser as IProfileUserLocalStorage);


  const iconMap: Record<keyof ProfilePageInfo, ReactElement> = {
    'nameSurname': <AccountCircleIcon/>,
    'email': <EmailIcon/>,
    'artistGenres': <TheaterComedyIcon/>,
    'artistSocial': <InstagramIcon/>,
    'venueName': <AccountBalanceIcon/>,
    'venueAddress': <MapIcon/>,
  }

  const titleMap: Record<keyof ProfilePageInfo, string> = {
    'nameSurname': 'Nome e Cognome',
    'email': 'Email',
    'artistGenres': 'Generi Artistici',
    'artistSocial': 'Social Artistico',
    'venueName': 'Nome Locale',
    'venueAddress': 'Indirizzo Locale',
  }

  const actions: ActionProps[] = [{
    label: 'Modifica profilo',
    startIcon: <CreateIcon/>,
    onClick: () => setIsEditModalOpen(true),
  }];

  return (
    <PanelPaperComponent subtitle="Informazioni personali" actions={actions}>
      {profileUser ?
        (
          <Box>
            <Box display="flex" gap={1}>
              {(Object.keys(infos) as Array<keyof ProfilePageInfo>).map((key) => (
                // @ts-ignore
                profileUser[key] != null &&
                (
                  <InfoCard
                    key={key}
                    icon={iconMap[key] ?? <DisabledByDefaultIcon/>}
                    title={titleMap[key]}
                    subtitle={formatValue(infos[key])}
                  />
                )
              ))};
            </Box>
            {isEditModalOpen && (
              <PersonalProfileEditDialog
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profileUser={profileUser}
              />
            )}
          </Box>
        ) :
        (
          <Typography>
            Nessuna informazione disponibile.
          </Typography>
        )
      }
    </PanelPaperComponent>
  )
}

