import {Avatar, Box, Card, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Rating from '@mui/material/Rating';
import {formatDate} from "@utils";


type FeedbackComponentProps = {
  user: string | undefined;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function FeedbackComponent({
                                            user,
                                            rating,
                                            comment,
                                            createdAt
                                          }: FeedbackComponentProps) {


  return (
    <Card>
      <Box display="flex">
        <Box display="flex" justifyContent="start" marginTop={0.5}>
          <Avatar>
            <PersonIcon/>
          </Avatar>
        </Box>
        <Box display="flex" flexDirection="column" ml={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontWeight="bold" color="white" marginBottom={0.5}>{user}</Typography>
            <Typography fontSize="10px" color="white">{formatDate(createdAt)}</Typography>
          </Box>
          <Typography color="white">{comment}</Typography>
          <Rating
            name="read-only"
            value={rating}
            size="small"
            sx={{color: '#FFD700'}}
            readOnly
          />
        </Box>
      </Box>
    </Card>
  );
}