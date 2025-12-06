import {type SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, Card, CardContent, Container, Typography,} from '@mui/material';
import '../../styles/global.scss';
import './loginPage.scss';
import {useLogin} from './api/useLogin.ts';
import {initialValuesloginSchema, type LoginFormValues, loginSchema} from "./form/authSchema.ts";
import {TextFormField, useAuth} from "@/components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {MusicVirusRoutesEnum} from "@/utils";

export default function LoginPage() {
    const {logout} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        logout();
        navigate(MusicVirusRoutesEnum.LOGIN, { replace: true });
    }, []);

    //Form
    const {
        handleSubmit,
        watch,
        control
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: initialValuesloginSchema,
    });

    //Login handler
    const {mutate: login, isPending} = useLogin();
    const handleLoginSubmit: SubmitHandler<LoginFormValues> = (values) => {
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
                            sx={{
                                height: 50,
                                width: 'auto',
                                objectFit: 'contain',
                                marginBottom: 5,
                            }}
                        />
                        {/* Form */}
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(handleLoginSubmit)}
                            className="auth-form"
                            sx={{gap:2}}
                        >
                            <TextFormField
                                control={control}
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="tua@gmail.com"
                                fullWidth
                            />
                            <TextFormField
                                control={control}
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                fullWidth
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

                        <Typography className="auth-helper" sx={{marginTop: '25px'}}>
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
