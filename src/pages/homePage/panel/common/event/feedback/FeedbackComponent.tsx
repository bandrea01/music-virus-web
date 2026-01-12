import {Avatar, Box, Card, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Rating from '@mui/material/Rating';


type FeedbackComponentProps = {
  user: string | undefined;
  rating: number;
  comment: string;
};

export default function FeedbackComponent({
                                            user,
                                            rating,
                                            comment
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
          <Typography fontWeight="bold" color="white">{user}</Typography>
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