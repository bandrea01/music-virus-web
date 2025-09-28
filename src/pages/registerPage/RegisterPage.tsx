import React, { useMemo } from 'react';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import { type SubmitHandler, useForm, type FieldErrors, Controller, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Link,
    TextField,
    Typography,
    Grid,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    FormHelperText,
} from '@mui/material';

import '../../styles/global.scss';
import '../loginPage/LoginPage.scss';

import {
    type RegisterFormValues,
    registerSchemaByType,
    type UserType,
} from '../../schema/registerSchema';

// type guard sul parametro route
const isUserType = (v: unknown): v is UserType =>
    v === 'fan' || v === 'artist' || v === 'venue';

const titleByType: Record<UserType, string> = {
    fan: 'Registrati come Fan',
    artist: 'Registrati come Artist',
    venue: 'Registrati come Venue',
};
const subtitleByType: Record<UserType, string> = {
    fan: 'Scopri, supporta e partecipa alla community.',
    artist: 'Promuovi la tua musica e monetizza il tuo talento.',
    venue: 'Gestisci eventi e trova artisti emergenti.',
};

// Generi preimpostati
const GENRES = [
    'Pop', 'Rock', 'Indie', 'Hip-Hop', 'Trap', 'R&B', 'Soul', 'Jazz',
    'Blues', 'Funk', 'Disco', 'House', 'Techno', 'EDM', 'Dubstep',
    'Drum & Bass', 'Reggae', 'Ska', 'Punk', 'Metal', 'Folk',
    'Cantautorato', 'Classica', 'Colonne Sonore', 'World',
];

// Props comuni ai blocchi specifici
type FieldsProps = {
    register: ReturnType<typeof useForm<RegisterFormValues>>['register'];
    errors: FieldErrors<RegisterFormValues>;
    control: Control<RegisterFormValues>;
};

// ARTIST — Generi musicali (Select multiple) + Social
const ArtistFields: React.FC<FieldsProps> = ({ register, errors, control }) => (
    <>
        <FormControl fullWidth size="small" margin="dense" error={!!errors.genres}>
            <InputLabel id="genres-label">Generi musicali</InputLabel>
            <Controller
                name="genres"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <Select
                        labelId="genres-label"
                        multiple
                        value={field.value ?? []}
                        onChange={(e) => field.onChange(e.target.value as string[])}
                        input={<OutlinedInput label="Generi musicali" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} size="small" />
                                ))}
                            </Box>
                        )}
                        MenuProps={{ PaperProps: { style: { maxHeight: 320 } } }}
                    >
                        {GENRES.map((g) => (
                            <MenuItem key={g} value={g}>
                                {g}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {!!errors.genres && (
                <FormHelperText>{errors.genres?.message as string}</FormHelperText>
            )}
        </FormControl>

        <TextField
            label="Social media"
            fullWidth
            size="small"
            margin="dense"
            {...register('socials' as const)}
            error={!!errors.socials}
            helperText={errors.socials?.message as string}
        />
    </>
);

const VenueFields: React.FC<FieldsProps> = ({ register, errors }) => (
    <>
        <TextField
            label="Nome Venue"
            fullWidth
            size="small"
            margin="dense"
            {...register('venueName' as const)}
            error={!!errors.venueName}
            helperText={errors.venueName?.message as string}
        />
        <TextField
            label="Indirizzo"
            fullWidth
            size="small"
            margin="dense"
            {...register('address' as const)}
            error={!!errors.address}
            helperText={errors.address?.message as string}
        />
    </>
);

export default function RegisterPage() {
    const params = useParams<{ type?: string }>();
    const typeParam = params.type;

    // redirect se parametro non valido
    if (!isUserType(typeParam)) {
        return <Navigate to="/pre-register" replace />;
    }
    const userType: UserType = typeParam;

    // schema dinamico per tipo
    const schema = useMemo(() => registerSchemaByType[userType], [userType]);

    // form
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            genres: [],
            socials: '',
            venueName: '',
            address: '',
        },
    });

    // submit abilitato solo se valori base presenti e form valido
    const [email, password, displayName] = watch(['email', 'password', 'displayName']);
    const hasBaseValues =
        (displayName?.trim()?.length ?? 0) > 0 &&
        (email?.trim()?.length ?? 0) > 0 &&
        (password?.trim()?.length ?? 0) > 0;

    const canSubmit = hasBaseValues && isValid && !isSubmitting;

    const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
        console.log('[Register] submit', userType, values);
        // TODO: registerRequest({ type: userType, ...values })
        // dispatch(setSnackbarSuccess('Registrazione completata ✅'));
        // navigate('/login');
    };

    const renderTypeFields = () => {
        const shared = { register, errors, control };
        switch (userType) {
            case 'fan':
                return null; // aggiungi qui i tuoi campi quando pronti
            case 'artist':
                return <ArtistFields {...shared} />;
            case 'venue':
                return <VenueFields {...shared} />;
        }
    };

    return (
        <Box className="auth" sx={{ height: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
            <Container className="auth__container" disableGutters>
                <Card className="auth-card" sx={{ maxWidth: 1100, mx: 'auto' }}>
                    <CardContent className="auth-card__inner">
                        <Grid container spacing={8} alignItems="flex-start">
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        src="/complete_logo.png"
                                        sx={{ height: 84, width: 'auto', objectFit: 'contain' }}
                                    />
                                    <Typography variant="h5" fontWeight={800} color="white">
                                        {titleByType[userType]}
                                    </Typography>
                                    <Typography variant="body2" color="white">
                                        {subtitleByType[userType]}
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={7} style={{width: "60%"}}>
                                <Box
                                    component="form"
                                    noValidate
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="auth-form"
                                >
                                    <Stack spacing={1} sx={{ width: '100%' }}>
                                        <TextField
                                            label="Nome"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            {...register('name')}
                                            error={!!errors.displayName}
                                            helperText={errors.displayName?.message as string}
                                        />
                                        <TextField
                                            label="Cognome"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            {...register('surname')}
                                            error={!!errors.displayName}
                                            helperText={errors.displayName?.message as string}
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

                                        {/* Campi specifici per tipo */}
                                        {renderTypeFields()}

                                        {/* Actions */}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                className="btn btn--primary"
                                                sx={{ color: '#fff' }}
                                                disabled={!canSubmit}
                                                aria-disabled={!canSubmit}
                                            >
                                                {isSubmitting ? 'Registrazione…' : 'Crea account'}
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
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
