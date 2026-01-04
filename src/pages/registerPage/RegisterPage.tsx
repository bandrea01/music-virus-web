import {useMemo} from 'react';
import {Link as RouterLink, Navigate, useParams} from 'react-router-dom';
import {FormProvider,} from 'react-hook-form';
import {Box, Button, Card, CardContent, Container, Grid, Link, Stack, Typography,} from '@mui/material';
import {
    type UserRegisterFormValues,
    type UserType,
    initialValuesByType,
    ArtistSection,
    useUserRegisterForm,
    VenueSection
} from '@pages';
import {useDispatch} from 'react-redux';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import '../../styles/global.scss';
import '../loginPage/loginPage.scss';
import {TextFormField} from "@/components";
import {AppRoutes} from "@/utils";
import {useRegisterUser} from "@api/hooks/useUser.tsx";

const isUserType = (v: unknown): v is UserType =>
    v === 'fan' || v === 'artist' || v === 'venue';

const imageByType: Record<UserType, string> = {
    fan: '/fan_background.jpg',
    artist: '/artist_background.jpg',
    venue: '/venue_background.jpg',
};

const titleByType: Record<UserType, string> = {
    fan: 'Registrati come Fan',
    artist: 'Registrati come Artist',
    venue: 'Registrati come Locale',
};
const subtitleByType: Record<UserType, string> = {
    fan: 'Scopri, supporta e partecipa alla community.',
    artist: 'Promuovi la tua musica e monetizza il tuo talento.',
    venue: 'Gestisci eventi e trova artisti emergenti.',
};

export default function RegisterPage() {

    // Check on user type
    const params = useParams<{ type?: string }>();
    const dispatch = useDispatch();
    const typeParam = params.type;
    if (!isUserType(typeParam)) {
        dispatch(setSnackbarError('Errore caricamento pagina di registrazione'));
        return <Navigate to="/pre-register" replace/>;
    }
    const userType: UserType = typeParam;
    const registerMutation = useRegisterUser(userType);

    //Form
    const initialValues = useMemo(
        () => {
            return initialValuesByType[userType];
        },
        [userType]
    );

    const {form} = useUserRegisterForm({initialValues});
    const {
        handleSubmit,
        control
    } = form;

    const handleRegisterSubmit = async (values: UserRegisterFormValues) => {
        switch (values.userType) {
            case "fan": {
                const payload = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    password: values.password,
                };
                await registerMutation.mutateAsync(payload);
                break;
            }
            case "artist": {
                const payload = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    password: values.password,
                    artistGenres: values.artistGenres ?? [],
                    artistSocial: values.artistSocial,
                };
                await registerMutation.mutateAsync(payload as any);
                break;
            }

            case 'venue': {
                const payload = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    password: values.password,
                    venueName: values.venueName,
                    address: values.venueAddress ?? null,
                };
                await registerMutation.mutateAsync(payload as any);
                break;
            }
        }
    };
    const renderSectionByType = () => {
        switch (userType) {
            case 'fan':
                return null;
            case 'artist':
                return <ArtistSection/>;
            case 'venue':
                return <VenueSection/>;
        }
    };

    return (
        <Box className="auth" sx={{display: 'grid', placeItems: 'center', p: 2}}>
            <Container className="auth__container" disableGutters>
                <Card className="auth-card" sx={{maxWidth: 1100, mx: 'auto'}}>
                    <CardContent className="auth-card__inner">
                        <FormProvider key={userType} {...form}>
                            <Grid container spacing={8} alignItems="center">
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        gap: '220px',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={imageByType[userType]}
                                        alt=""
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            zIndex: 0,
                                            filter: 'brightness(0.3)',
                                            borderRadius: 4,
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            position: 'relative',
                                            zIndex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            textAlign: 'center',
                                            color: '#fff',
                                            p: 6,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src="/complete_logo.png"
                                            sx={{
                                                height: 60,
                                                width: 'auto',
                                                objectFit: 'contain',
                                                mb: 2,
                                                filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.6))',
                                            }}
                                        />

                                        <Box>
                                            <Typography variant="h4" fontWeight={800}>
                                                {titleByType[userType]}
                                            </Typography>
                                            <Typography variant="body2">{subtitleByType[userType]}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit(handleRegisterSubmit)}
                                        className="auth-form"
                                        sx={{width: '160%', maxWidth: 'none'}}
                                    >
                                        <Stack spacing={2} sx={{width: '100%'}}>
                                            <TextFormField
                                                control={control}
                                                name="name"
                                                label="Nome"
                                                fullWidth
                                            />
                                            <TextFormField
                                                control={control}
                                                name="surname"
                                                label="Cognome"
                                                fullWidth
                                            />
                                            <TextFormField
                                                control={control}
                                                name="email"
                                                label="Email"
                                                type="email"
                                                autoComplete="email"
                                                fullWidth
                                            />
                                            <TextFormField
                                                control={control}
                                                name="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="new-password"
                                                fullWidth
                                            />
                                            <TextFormField
                                                control={control}
                                                name="confirmPassword"
                                                label="Conferma Password"
                                                type="password"
                                                autoComplete="new-password"
                                                fullWidth
                                            />

                                            {renderSectionByType()}

                                            <Box sx={{display: 'flex', justifyContent: 'flex-end', pt: 1}}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    className="btn btn--primary"
                                                    sx={{color: '#fff'}}
                                                    disabled={!form.formState.isValid}
                                                >
                                                    Crea account
                                                </Button>
                                            </Box>

                                            <Typography variant="body2" color="white">
                                                Hai già un account?{' '}
                                                <Link component={RouterLink} to={AppRoutes.LOGIN}>
                                                    Accedi
                                                </Link>
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid>
                        </FormProvider>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
