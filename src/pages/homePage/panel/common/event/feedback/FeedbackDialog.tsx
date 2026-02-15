import {DialogComponent, useAuth} from "@components";
import {type ReactElement, useState} from "react";
import {type Feedback, FeedbackComponent, type UserProfile} from "@pages";
import {useDomainGetFans, useGetFeedbacks, useSendFeedback} from "@api";
import {Box, Divider, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Rating from "@mui/material/Rating";

type FeedbackDialogProps = {
  eventId: string;
  isDialogOpen: boolean;
  onClose: () => void;
}

type EnrichFeedback = Feedback & {
  userName?: string;
}

export default function FeedbackDialog({
                                         eventId,
                                         isDialogOpen,
                                         onClose
                                       }: FeedbackDialogProps): ReactElement {

  const [feedbackDescription, setFeedbackDescription] = useState<string>("");
  const [feedbackRating, setFeedbackRating] = useState<number | null>(1);

  const isSendButtonDisabled = feedbackDescription.trim() === "" || feedbackRating === null;

  const {data: fans} = useDomainGetFans();
  const {data: feedbacks} = useGetFeedbacks(eventId)
  const {mutate: sendFeedback} = useSendFeedback(eventId);
  const {authUser} = useAuth();

  feedbacks?.forEach((feedback) => {
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
        <Box display="flex" flexDirection="column" gap={2} sx={{maxHeight: 300, overflowY: 'scroll'}}>
          {feedbacks?.length === 0 && (
            <Typography color="white">Nessun feedback disponibile per questo evento.</Typography>
          )}
          {feedbacks?.map((feedback) => (
            <Box>
              <FeedbackComponent
                user={(feedback as EnrichFeedback).userName}
                rating={feedback.rating}
                comment={feedback.comment}
                createdAt={feedback.createdAt}
              />
            </Box>
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
            value={feedbackDescription}
            onChange={(e) => setFeedbackDescription(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={isSendButtonDisabled}
                      onClick={() => {
                        sendFeedback({
                          userId: authUser?.userId ?? "",
                          rating: feedbackRating ?? 1,
                          comment: feedbackDescription,
                        })
                        setFeedbackDescription("");
                        setFeedbackRating(1);
                      }}
                      sx={{color: isSendButtonDisabled ? 'gray !important' : 'white'}}
                    >
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