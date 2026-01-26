import {Link as RouterLink} from "react-router-dom";
import {Box, Typography,} from "@mui/material";
import {PreRegisterCard, usePreRegisterInformation} from "@pages";
import "../../styles/global.scss";
import "./preRegisterPage.scss";
import {AppRoutes} from "@utils";

export default function PreRegisterPage() {

  const preRegisterInformations = usePreRegisterInformation();

  return (
    <Box className="pre-register" sx={{minHeight: "100vh", placeItems: "center"}}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box
          component="img"
          src="/complete_logo.png"
          alt="MusicVirus"
          sx={{height: 70, width: "auto", objectFit: "contain", mb: 6}}
        />

        <Box display="flex" gap={4} className="cards" justifyContent="center">
          {preRegisterInformations.map((info) => (
            <Box key={info.userType}>
              <PreRegisterCard info={info}/>
            </Box>
          ))}
        </Box>

        <Box>
          <Typography className="bottom__login">
            Hai già un account?{" "}
            <Box
              component={RouterLink}
              to={AppRoutes.LOGIN}
            >
              Accedi qui
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
