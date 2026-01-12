import {type ReactElement, useState} from "react";
import {type EnrichEvent, FeedbackDialog} from "@pages";
import {formatDateWithTime} from "@utils";
import {Avatar, Box, Button, Card, Divider, Tooltip, Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type EventCardComponentProps = {
  event: EnrichEvent;
}


export default function EventCardComponent({
                                             event,
                                           }: EventCardComponentProps): ReactElement {

  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const actions = [
    {
      label: 'Donazioni',
      startIcon: <AttachMoneyIcon/>,
      onClick: () => {
        // setSelectedFundraising(fundraising);
        // setIsEditDialogOpen(true);
      },
    },
  ];

  //Adding feedbacks
  if (new Date(event.eventDate) < new Date()) {
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
            <Box display="flex" justifyContent="space-between" gap={0.5}>
              <Typography fontSize="18px" color="white" fontWeight="bold"
                          sx={{textDecoration: 'underline'}}>
                {event.eventName}
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
            isDialogOpen={isFeedbackDialogOpen}
            onClose={() => setIsFeedbackDialogOpen(false)}
          />
        )
      }
    </Card>
  )
}
