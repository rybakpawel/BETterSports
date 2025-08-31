"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    loginUserValidation,
    LoginUserType,
} from "@/validation/common/loginUserValidation";
import {
    forgotPasswordValidation,
    ForgotPasswordType,
} from "@/validation/common/forgotPasswordValidation";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoadingLoginForm, setIsLoadingLoginForm] = useState(false);
    const [isLoadingForgotPasswordForm, setIsLoadingForgotPasswordForm] =
        useState<boolean>(false);
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
        useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] = useState(false);
    const {
        register: loginRegister,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
    } = useForm<LoginUserType>({
        resolver: zodResolver(loginUserValidation),
    });
    const {
        register: forgotPasswordRegister,
        handleSubmit: handleForgotPasswordSubmit,
        formState: { errors: forgotErrors },
    } = useForm<ForgotPasswordType>({
        resolver: zodResolver(forgotPasswordValidation),
    });

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const passwordChanged = searchParams.get("changedpassword");
        if (passwordChanged) {
            setApiResponse({
                success: true,
                statusCode: 200,
                message: "Hasło zostało pomyślnie zmienione",
            });
            setIsApiResponseVisible(true);
        }

        const tokenExpired = searchParams.get("tokenexpired");
        if (tokenExpired) {
            setApiResponse({
                success: false,
                statusCode: 401,
                message: "Token aktywacyjny wygasł",
            });
            setIsApiResponseVisible(true);
        }

        const accountActivated = searchParams.get("accountactivated");
        if (accountActivated) {
            setApiResponse({
                success: true,
                statusCode: 200,
                message: "Twoje konto zostało aktywowane",
            });
            setIsApiResponseVisible(true);
        }
    }, [searchParams]);

    const handleSubmitLoginForm = async (data: LoginUserType) => {
        setIsLoadingLoginForm(true);

        const res = await signIn("credentials", {
            ...data,
            redirect: false,
        });

        if (!res?.ok) {
            if (res?.error) {
                const parsedError = JSON.parse(res.error);

                setApiResponse(parsedError);
                setIsApiResponseVisible(true);
            }
        } else {
            router.push("/");
        }

        setIsLoadingLoginForm(false);
    };

    const handleSubmitForgotPasswordForm = async (data: ForgotPasswordType) => {
        setIsLoadingForgotPasswordForm(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data.email),
            }
        );

        const result = await res.json();

        setIsLoadingForgotPasswordForm(false);

        if (result.success) {
            setOpenForgotPasswordModal(false);
        }

        setApiResponse(result);
        setIsApiResponseVisible(true);
    };

    return (
        <>
            <Card
                sx={{
                    my: "5vh",
                    height: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="h1">
                        BETter - daj się ponieść stadionowej atmosferze!
                    </Typography>
                    <Box
                        component="form"
                        sx={{ my: 5 }}
                        onSubmit={handleSubmitLogin(handleSubmitLoginForm)}
                    >
                        <TextField
                            id="email"
                            label="E-mail"
                            {...loginRegister("email")}
                            error={!!loginErrors.email}
                            helperText={loginErrors.email?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: loginErrors.email ? 0 : 2,
                            }}
                        />
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={!!loginErrors.password}
                        >
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Hasło"
                                type={showPassword ? "text" : "password"}
                                {...loginRegister("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>
                                {loginErrors.password?.message}
                            </FormHelperText>
                        </FormControl>
                        <Box
                            sx={{
                                textAlign: "right",
                                mb: 5,
                            }}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    textAlign: "right",
                                    padding: "0",
                                    ":hover": {
                                        color: "primary.dark",
                                        backgroundColor: "inherit",
                                    },
                                }}
                                onClick={() => setOpenForgotPasswordModal(true)}
                            >
                                Zapomniałem hasła
                            </Button>
                        </Box>
                        <LoadingButton
                            type="submit"
                            fullWidth={true}
                            variant="contained"
                            loading={isLoadingLoginForm}
                            sx={{ mb: 2 }}
                        >
                            Zaloguj
                        </LoadingButton>
                        <Link href={"/sign-up"}>
                            <Button fullWidth={true} variant="outlined">
                                Rejestracja
                            </Button>
                        </Link>
                    </Box>
                </CardContent>
            </Card>
            <Modal
                open={openForgotPasswordModal}
                onClose={() => setOpenForgotPasswordModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="small"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        <Typography variant="h6" component="h3">
                            Zresetuj hasło
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: 5 }}
                            onSubmit={handleForgotPasswordSubmit(
                                handleSubmitForgotPasswordForm
                            )}
                        >
                            <TextField
                                id="forgot-email"
                                label="E-mail"
                                {...forgotPasswordRegister("email")}
                                variant="outlined"
                                fullWidth
                                error={!!forgotErrors.email}
                                helperText={forgotErrors.email?.message}
                                sx={{
                                    mb: forgotErrors.email ? 0 : 2,
                                }}
                            />
                            <LoadingButton
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                loading={isLoadingForgotPasswordForm}
                                sx={{ mb: 2 }}
                            >
                                Wyślij na e-mail
                            </LoadingButton>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
}
