import {Box, CircularProgress} from "@mui/material";
import type {ReactElement} from "react";

type ScreenSpinnerProps = {
  height?: number | string;
}

export default function ScreenSpinner({
                                        height
                                      }: ScreenSpinnerProps): ReactElement {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress
        sx={{color: '#b36bff', height: height ?? 40, width: height ?? 40}}
      />
    </Box>
  );
}

