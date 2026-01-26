import {useEffect, useMemo} from 'react';
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
import {FormProvider,} from 'react-hook-form';
import {Box, Button, Card, CardContent, Container, Grid, Link, Stack, Typography,} from '@mui/material';
import {
  ArtistSection,
  initialValuesByType,
  type UserRegisterFormValues,
  useUserRegisterForm,
  VenueSection
} from '@pages';
import {useDispatch} from 'react-redux';
import {setSnackbarError} from '@store/snackbar/slice.ts';
import '../../styles/global.scss';
import '../loginPage/loginPage.scss';
import {TextFormField} from "@/components";
import {AppRoutes, UserTypeEnum, type UserTypeKey} from "@/utils";
import {useRegisterUser} from "@api/hooks/useUser.tsx";

const isUserType = (user: unknown): user is UserTypeKey =>
  user === UserTypeEnum.FAN ||
  user === UserTypeEnum.ARTIST ||
  user === UserTypeEnum.VENUE;

const imageByType: Record<UserTypeKey, string> = {
  FAN: '/fan_background.jpg',
  ARTIST: '/artist_background.jpg',
  VENUE: '/venue_background.jpg',
};

const titleByType: Record<UserTypeKey, string> = {
  FAN: 'Registrati come Fan',
  ARTIST: 'Registrati come Artist',
  VENUE: 'Registrati come Locale',
};

const subtitleByType: Record<UserTypeKey, string> = {
  FAN: 'Scopri, supporta e partecipa alla community.',
  ARTIST: 'Promuovi la tua musica e monetizza il tuo talento.',
  VENUE: 'Gestisci eventi e trova artisti emergenti.',
};

export default function RegisterPage() {

  // Check on user type
  const params = useParams<{ type?: string }>();
  const typeParam = params.type?.toUpperCase();
  const validType = isUserType(typeParam);
  const userType = typeParam as UserTypeKey;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {mutateAsync: registerUser} = useRegisterUser(userType);

  useEffect(() => {
    if (!validType) {
      dispatch(setSnackbarError("Errore caricamento pagina di registrazione"));
      navigate(AppRoutes.PRE_REGISTER, {replace: true});
    }
  }, [validType]);

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
      case UserTypeEnum.FAN : {
        const payload = {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
        };
        await registerUser(payload);
        break;
      }
      case UserTypeEnum.ARTIST: {
        const payload = {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          artistGenres: values.artistGenres ?? [],
          artistSocial: values.artistSocial,
        };
        await registerUser(payload);
        break;
      }

      case UserTypeEnum.VENUE: {
        const payload = {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          venueName: values.venueName,
          venueAddress: values.venueAddress ?? null,
        };
        await registerUser(payload);
        break;
      }
    }
  };
  const renderSectionByType = () => {
    switch (userType) {
      case UserTypeEnum.FAN:
        return null;
      case UserTypeEnum.ARTIST:
        return <ArtistSection/>;
      case UserTypeEnum.VENUE:
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
