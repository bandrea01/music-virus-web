import {Box, CircularProgress} from "@mui/material";
import type {ReactElement} from "react";

export default function FullScreenSpinner(): ReactElement {
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

