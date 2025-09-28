import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, Card, CardContent, Container, TextField, Typography,} from '@mui/material';
import '../../styles/global.scss';
import './LoginPage.scss';
import {useLogin} from '../../hooks/useLogin';
import {type loginFormValues, loginSchema} from "../../schema/authSchema.ts";

export default function LoginPage() {

    //Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<loginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: { email: '', password: '' },
    });

    //Login handler
    const {mutate: login, isPending} = useLogin();
    const handleLoginSubmit: SubmitHandler<loginFormValues> = (values) => {
        login(values);
    }

    //Login button disabled flag
    const [email, password] = watch(['email', 'password']);
    const isLoginButtonEnabled = email.trim().length > 0 && password.trim().length > 0;

    return (
        <Box className="auth" sx={{height: '100vh', display: 'grid', placeItems: 'center'}}>
            <Container className="auth__container" disableGutters>
                <Card className="auth-card" sx={{maxWidth: 420, mx: 'auto'}}>
                    <CardContent className="auth-card__inner">
                        <Box
                            component="img"
                            src="/complete_logo.png"
                            sx={{height: 110, width: 'auto', objectFit: 'contain'}}
                        />
                        {/* Form */}
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(handleLoginSubmit)}
                            className="auth-form"
                        >
                            <TextField
                                label="Email"
                                type="email"
                                placeholder="tua@email.it"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email')}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register('password')}
                            />
                            <Button
                                type="submit"
                                className="btn btn--primary"
                                sx={{color: '#fff'}}
                                disabled={!isLoginButtonEnabled || isPending}
                            >
                                {isPending ? '...' : 'Accedi'}
                            </Button>
                        </Box>

                        <Typography className="auth-helper">
                            Non hai un account?{' '}
                            <Box component="a" href="/pre-register" className="auth-link">
                                Registrati
                            </Box>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
