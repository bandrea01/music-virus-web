import {DialogComponent} from "@components";
import {type ReactElement, useState} from "react";
import {type Feedback, FeedbackComponent, type UserProfile} from "@pages";
import {useGetFans} from "@api";
import {Box, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Rating from "@mui/material/Rating";

type FeedbackDialogProps = {
  isDialogOpen: boolean;
  onClose: () => void;
}

type EnrichFeedback = Feedback & {
  userName?: string;
}

export default function FeedbackDialog({
                                         isDialogOpen,
                                         onClose
                                       }: FeedbackDialogProps): ReactElement {

  const [feedbackRating, setFeedbackRating] = useState<number | null>(1);

  const feedbacks: Feedback[] = [
    {
      feedbackId: "fb1",
      eventId: "Concerto di Natale",
      userId: "68e3bc8afe65ad477f7c4085",
      rating: 5,
      comment: "Evento fantastico! Mi sono divertito molto."
    },
    {
      feedbackId: "fb2",
      eventId: "Concerto di Natale",
      userId: "68e3bc8afe65ad477f7c4085",
      rating: 4,
      comment: "Ottimo evento, ma il suono poteva essere migliore."
    }
  ];

  const {data: fans} = useGetFans();

  feedbacks.forEach((feedback) => {
    const user = fans?.find((user: UserProfile) => user.userId === feedback.userId);
    if (user) {
      (feedback as EnrichFeedback).userName = user.name + " " + user.surname;
    }
  });

  return (
    <DialogComponent
      title="Feedback dell'evento"
      isOpen={isDialogOpen}
      onClose={() => onClose()}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" gap={2}>
          {feedbacks.map((feedback) => (
            <FeedbackComponent
              user={(feedback as EnrichFeedback).userName}
              rating={feedback.rating}
              comment={feedback.comment}/>
          ))}
        </Box>
        <Divider color={"#122341"}/>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" gap={1} alignItems="center">
            <Typography fontSize="16px" fontWeight="bold" color="white" marginTop={0.5} marginLeft={1}>
              Lascia un voto:
            </Typography>
            <Rating
              name="simple-controlled"
              value={feedbackRating}
              size="large"
              sx={{color: '#FFD700'}}
              onChange={(_, newValue) => {
                setFeedbackRating(newValue);
              }}
            />
          </Box>
          <TextField
            multiline
            rows={3}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => {
                    }}>
                      <SendIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>
    </DialogComponent>
  );
}