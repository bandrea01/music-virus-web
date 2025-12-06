import {Box, CircularProgress} from "@mui/material";

const FullScreenSpinner = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress
                sx={{color: '#b36bff'}}
            />
        </Box>
    );
}

export default FullScreenSpinner;