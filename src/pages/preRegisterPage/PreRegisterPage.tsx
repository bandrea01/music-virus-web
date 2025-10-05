import {useNavigate} from 'react-router-dom';
import {Box, Button, Card, CardActionArea, CardContent, Chip, Container, Typography,} from '@mui/material';
import Grid from '@mui/material/Grid';
import '../../styles/global.scss';
import './preRegisterPage.scss';
import {useUserType} from "./useUserType.ts";

export default function PreRegisterPage() {
    const navigate = useNavigate();
    const {userTypes} = useUserType();

    return (
        <Box
            className="pre-register"
            sx={{height: '100vh', display: 'grid', placeItems: 'center'}}
        >
            <Container className="pre-register__container" disableGutters>
                {/* Header */}
                <Box className="header">
                    <Box component="img" src="/complete_logo.png"
                         style={{
                             height: 70,
                             width: "auto",
                             objectFit: "contain",
                             marginBottom: 50
                    }}
                    />
                    <Typography className="section-header__description">
                        Unisciti alla nostra community e inizia il tuo viaggio musicale.
                        Ogni tipo di account è progettato per offrire un&apos;esperienza unica.
                    </Typography>
                </Box>
                {/* Cards */}
                <Grid container spacing={4} className="cards" justifyContent="center">
                    {userTypes.map((type) => (
                        // @ts-ignore
                        <Grid xs={12} md={4} key={type.id}>
                            <Card className={['card', `card--${type.id}`].join(' ')}>
                                <CardActionArea
                                    onClick={() => navigate(`/register/${type.id}`)}
                                >
                                    <CardContent className="card__inner">
                                        <Box className="card__header">
                                            <Box className="card__title-wrap">
                                                <Typography
                                                    component="h3"
                                                    className="card__title"
                                                >
                                                    {type.name}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={type.fee}
                                                className={['badge', `badge--${type.id}`].join(' ')}
                                                variant="outlined"
                                            />
                                        </Box>
                                        <Box className="card__emoji">
                                            <Box className="card__emoji-inner">
                                                {type.image}
                                            </Box>
                                        </Box>
                                        <Box component="ul" className="benefits">
                                            {type.benefits.map((b, idx) => (
                                                <Box key={idx} component="li"
                                                     className={['benefits__item', `u-delay-${idx + 1}`].join(' ')}>
                                                    <Box className="benefits__dot"/>
                                                    <Typography className="benefits__text">
                                                        {b}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Button
                                            className="btn btn--primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/register/${type.id}`);
                                            }}
                                        >
                                            Registrati come {type.name}
                                        </Button>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Bottom */}
                <Box className="bottom">
                    <Typography className="bottom__login">
                        Hai già un account?
                        <Box component="a" href="/login" className="bottom__login-link">Accedi qui</Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
