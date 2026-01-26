import {Box, Button, Card, CardContent, Chip, Typography} from "@mui/material";
import type {TPreRegisterInformation} from "@pages";
import {AppRoutes, type UserTypeKey} from "@utils";
import {useNavigate} from "react-router-dom";
import type {ReactElement} from "react";

type PreRegisterCardProps = {
  info: TPreRegisterInformation;
};

export default function PreRegisterCard({
                                          info,
                                        }: PreRegisterCardProps): ReactElement {

  const navigate = useNavigate();
  const navigateToRegisterPage = (userType: UserTypeKey) => navigate(AppRoutes.REGISTER.byType(userType));


  return (
    <Card className={["card", `card--${info.userType}`].join(" ")}>
      <CardContent className="card__inner">
        <Box className="card__header">
          <Box className="card__title-wrap">
            <Typography component="h3" className="card__title">
              {info.name}
            </Typography>
          </Box>

          <Chip
            label={info.fee}
            sx={{fontWeight: "bold", color: "white", background: "#8d41a1"}}
          />
        </Box>

        <Box className="card__emoji">
          <Box className="card__emoji-inner">{info.image}</Box>
        </Box>

        <Box component="ul" className="benefits">
          {info.benefits.map((benefit, idx) => (
            <Box
              key={idx}
              component="li"
              className={["benefits__item", `u-delay-${idx + 1}`].join(" ")}
            >
              <Box className="benefits__dot"/>
              <Typography className="benefits__text">{benefit}</Typography>
            </Box>
          ))}
        </Box>
        <Button
          onClick={() => navigateToRegisterPage(info.userType)}
        >
          Registrati come {info.name}
        </Button>
      </CardContent>
    </Card>
  );
}