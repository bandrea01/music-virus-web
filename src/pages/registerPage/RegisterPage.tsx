import {useMemo} from 'react';
import {Link as RouterLink, Navigate, useParams} from 'react-router-dom';
import {FormProvider,} from 'react-hook-form';
import {Box, Button, Card, CardContent, Container, Grid, Link, Stack, TextField, Typography,} from '@mui/material';
import {initialValuesByType, type UserRegisterFormValues, type UserType} from '../../schema/registerSchema';
import {useDispatch} from 'react-redux';
import {setSnackbarError} from '../../store/snackbar/slice';
import {ArtistSection} from './ArtistSection.tsx';
import {VenueSection} from './VenueSection.tsx';
import {useUserRegisterUser} from "../../hooks/useUserRegisterUser.ts";
import {useUserRegisterForm} from "../../hooks/useRegisterForm.ts";
import '../../styles/global.scss';
import '../loginPage/LoginPage.scss';

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
    const registerMutation = useUserRegisterUser(userType);

    //Form
    const initialValues = useMemo(
        () => {
            return initialValuesByType[userType];
        },
        [userType]
    );

    const { form } = useUserRegisterForm({initialValues});
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = form;

    console.log(form.getValues());

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
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
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
                                </Grid>

                                <Grid item xs={12} md={7}>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit(handleRegisterSubmit)}
                                        className="auth-form"
                                        sx={{width: '160%', maxWidth: 'none'}}
                                    >
                                        <Stack spacing={2} sx={{width: '100%'}}>
                                            <TextField
                                                label="Nome"
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                                {...register('name')}
                                                error={!!errors.name}
                                                helperText={errors.name?.message as string}
                                            />
                                            <TextField
                                                label="Cognome"
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                                {...register('surname')}
                                                error={!!errors.surname}
                                                helperText={errors.surname?.message as string}
                                            />
                                            <TextField
                                                label="Email"
                                                type="email"
                                                autoComplete="email"
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                                {...register('email')}
                                                error={!!errors.email}
                                                helperText={errors.email?.message as string}
                                            />
                                            <TextField
                                                label="Password"
                                                type="password"
                                                autoComplete="new-password"
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                                {...register('password')}
                                                error={!!errors.password}
                                                helperText={errors.password?.message as string}
                                            />
                                            <TextField
                                                label="Conferma Password"
                                                type="password"
                                                autoComplete="new-password"
                                                fullWidth
                                                size="small"
                                                margin="dense"
                                                {...register('confirmPassword')}
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword?.message as string}
                                            />

                                            {renderSectionByType()}

                                            <Box sx={{display: 'flex', justifyContent: 'flex-end', pt: 1}}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    className="btn btn--primary"
                                                    sx={{color: '#fff'}}
                                                    disabled={!isValid}
                                                >
                                                    Crea account
                                                </Button>
                                            </Box>

                                            <Typography variant="body2" color="white">
                                                Hai già un account?{' '}
                                                <Link component={RouterLink} to="/login">
                                                    Accedi
                                                </Link>
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </FormProvider>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
