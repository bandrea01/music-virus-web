import {type ReactElement, useState} from "react";
import {
  type EnrichEvent,
  type EnrichTopContributor,
  FeedbackDialog,
  PromotionType,
  type PromotionTypeKey
} from "@pages";
import {type ActionProps, EventStatusEnum, formatDateWithTime} from "@utils";
import {Avatar, Box, Button, Card, Divider, Tooltip, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import {useDomainGetArtists, useDomainGetFans, useDomainGetVenues, useGetTopContributors} from "@api";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

type EventCardComponentProps = {
  event: EnrichEvent;
}

function getContributorBorderColor(index: number) {
  const colors = ['#ffae00', '#C0C0C0', '#CD7F32'];
  return colors[index];
}

export default function EventCardComponent({
                                             event,
                                           }: EventCardComponentProps): ReactElement {

  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const {data: topContributors} = useGetTopContributors(event.fundraisingId);
  const {data: artists} = useDomainGetArtists();
  const {data: venues} = useDomainGetVenues();
  const {data: fans} = useDomainGetFans();


  //enrich top contributors with name and surname only if contributor is not anonymous
  const enrichedTopContributors: EnrichTopContributor[] | undefined = topContributors?.map(contributor => {
    if (contributor.anonymous) {
      return contributor;
    }

    const fan = fans?.find(f => f.userId === contributor.userId);
    const artist = artists?.find(a => a.userId === contributor.userId);
    const venue = venues?.find(v => v.userId === contributor.userId);

    if (fan) {
      return {
        ...contributor,
        name: fan.name ?? "Utente",
        surname: fan.surname ?? ""
      };
    }

    if (artist) {
      const display = (artist.name ?? (artist.surname as string) ?? "").trim();
      const [first, ...rest] = display.split(/\s+/);
      return {
        ...contributor,
        name: first || "Artista",
        surname: rest.join(' ') || ""
      };
    }

    if (venue) {
      const display = (venue.name ?? (venue.venueName as string) ?? "").trim();
      return {
        ...contributor,
        name: display || "Venue",
        surname: ""
      };
    }

    return {
      ...contributor,
      name: "Utente",
      surname: ""
    };
  });

  let actions: ActionProps[] = [];
  //Adding feedbacks
  if (event.status === EventStatusEnum.FINISHED) {
    actions.push({
      label: 'Lascia un feedback',
      startIcon: <ChatBubbleIcon/>,
      onClick: () => {
        setIsFeedbackDialogOpen(true);
      }
    })
  }

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: `transparent`,
        borderWidth: "3px !important",
        padding: "20px",
        borderRadius: "15px",
        opacity: "100%",
        minHeight: "200px",
        minWidth: "150px",
        "&:hover": {cursorPointer: "pointer"}
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" gap={2}>
        <Box display="flex" justifyContent="start" alignItems="center" gap={2}>
          <Box>
            <Tooltip title={event.artistName} arrow>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '10px',
                  backgroundColor: '#335998',
                }}
                variant="circular"
              >
                {event.artistName.split(' ')[0].charAt(0)}{event.artistName.split(' ')[1].charAt(0)}
              </Avatar>
            </Tooltip>
          </Box>
          <Box display="flex" flexDirection="column" overflow="hidden">
            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={0.5}>
              <Typography fontSize="18px" color="white" fontWeight="bold"
                          sx={{textDecoration: 'underline'}}>
                {event.eventName}
              </Typography>
              <Typography fontSize="10px" color="white">
                {event.status}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{color: 'white'}}/>
            <Typography fontWeight="bold" color="white" fontSize="13px">
              {formatDateWithTime(event.eventDate)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationPinIcon sx={{color: 'white'}}/>
            <Typography fontWeight="bold" color="white" fontSize="13px">
              {event.venueName}
            </Typography>
            {
              event.venuePromotion !== "NONE" && (
                <Tooltip
                  title={`Promozione attiva: ${PromotionType[event.venuePromotion as PromotionTypeKey]}`}
                  arrow
                >
                  <LocalActivityIcon sx={{color: '#BBF7D0', marginLeft: '20px'}}/>
                </Tooltip>
              )
            }
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <MilitaryTechIcon sx={{color: 'white'}}/>
            <Typography fontWeight="bold" color="white" fontSize="13px">
              Contributori principali:
            </Typography>
            {enrichedTopContributors && enrichedTopContributors.length > 0 && (
              enrichedTopContributors.map((contributor, index) => (
                <Tooltip
                  key={contributor.userId}
                  title={contributor.anonymous ? "Anonimo" : `${contributor.name} ${contributor.surname}`}
                  arrow
                >
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                      objectFit: 'cover',
                      backgroundColor: '#643398',
                      border: `2px solid ${getContributorBorderColor(index)}`,
                      fontSize: '8px',
                    }}
                    variant="circular"
                  >
                    {contributor.anonymous ? "?" : `${contributor.name!.charAt(0)} ${contributor.surname!.charAt(0)}`}
                  </Avatar>
                </Tooltip>
              ))
            )}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" width="100%" gap={1}>
        </Box>
        <Divider color={"#25324a"} sx={{marginBottom: '10px'}}/>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          {actions.map((action) => {
            return (
              <Button
                key={action.label}
                onClick={action.onClick}
                startIcon={action.startIcon}
                sx={{fontSize: "10px !important"}}
              >
                {action.label}
              </Button>
            );
          })}
        </Box>
      </Box>
      {
        isFeedbackDialogOpen && (
          <FeedbackDialog
            eventId={event.eventId}
            isDialogOpen={isFeedbackDialogOpen}
            onClose={() => setIsFeedbackDialogOpen(false)}
          />
        )
      }
    </Card>
  )
}
