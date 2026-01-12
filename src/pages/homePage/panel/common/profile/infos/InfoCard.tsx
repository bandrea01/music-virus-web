import {Box, Card, Icon, Typography} from "@mui/material";
import type {ReactElement} from "react";

type InfoCardProps = {
  icon: ReactElement;
  title: string;
  subtitle: string;
}

export default function InfoCard({
                                   icon,
                                   title,
                                   subtitle
                                 }: InfoCardProps): ReactElement {
  return (
    <Card
      sx={{
        backgroundColor: "#17243c !important",
        ":hover": {
          backgroundColor: "#1e3250 !important",
          cursor: "pointer",
        }
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={2} gap={1}>
        <Icon fontSize="medium" sx={{color: "#fafafa"}}>
          {icon}
        </Icon>
        <Typography flex={1} fontWeight="bold" color="white" fontSize="15px" textAlign="center">
          {title}
        </Typography>
        <Typography color="white" fontSize="13px">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  );
}