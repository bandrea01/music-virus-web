import {Box, CircularProgress} from "@mui/material";
import type {ReactElement} from "react";

export default function ScreenSpinner(): ReactElement {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <CircularProgress
                sx={{color: '#b36bff'}}
            />
        </Box>
    );
}

