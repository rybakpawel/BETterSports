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
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LabelTextInput from "@/components/form/LabelTextInput";
import AuthPageWrapper from "@/components/sections/AuthPageWrapper";
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
            <AuthPageWrapper>
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "16px",
                        p: 0.5,
                        mb: 4,
                        display: "flex",
                        gap: 1,
                    })}
                >
                    <Button variant="contained" color="primary" fullWidth>
                        Logowanie
                    </Button>
                    <Link href="/sign-up" style={{ width: "100%" }}>
                        <Button
                            variant="text"
                            fullWidth
                            sx={(theme) => ({
                                py: 1.5,
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    color: theme.palette.text.primary,
                                    backgroundColor: "transparent",
                                },
                            })}
                        >
                            Rejestracja
                        </Button>
                    </Link>
                </Box>
                <Box
                    component="form"
                    sx={{ my: 5 }}
                    onSubmit={handleSubmitLogin(handleSubmitLoginForm)}
                >
                    <LabelTextInput
                        label="E-mail"
                        inputId="email"
                        errorText={loginErrors.email?.message}
                        textFieldProps={{
                            placeholder: "Wprowadź e-mail",
                            ...loginRegister("email"),
                        }}
                    />
                    <LabelTextInput
                        label="Hasło"
                        inputId="password"
                        isPassword={true}
                        errorText={loginErrors.password?.message}
                        textFieldProps={{
                            placeholder: "Wprowadź hasło",
                            ...loginRegister("password"),
                        }}
                    />
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
                        sx={{ mb: 4 }}
                    >
                        Zaloguj
                    </LoadingButton>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography color="text.secondary" fontSize={14}>
                            Nie masz konta?{" "}
                            <Link
                                href="/sign-up"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="text"
                                    sx={(theme) => ({
                                        color: theme.palette.primary.main,
                                        textTransform: "none",
                                        fontSize: 14,
                                        p: 0,
                                        minWidth: "auto",
                                        "&:hover": {
                                            color: theme.palette.primary.light,
                                            backgroundColor: "transparent",
                                        },
                                    })}
                                >
                                    Zarejestruj się
                                </Button>
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                <Modal
                    open={openForgotPasswordModal}
                    onClose={() => setOpenForgotPasswordModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    }}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                    }}
                >
                    <Card variant="sm">
                        <CardContent
                            sx={{
                                p: 4,
                                "&:last-child": { paddingBottom: "2rem" },
                            }}
                        >
                            <Box sx={{ textAlign: "center", mb: 3 }}>
                                <Box
                                    sx={(theme) => ({
                                        backgroundColor:
                                            theme.palette.info.main,
                                        p: 1.5,
                                        borderRadius: 3,
                                        display: "inline-block",
                                        mb: 2,
                                    })}
                                >
                                    <Typography
                                        component="span"
                                        sx={(theme) => ({
                                            color: theme.palette.info
                                                .contrastText,
                                            fontSize: 24,
                                            fontWeight: 800,
                                        })}
                                    >
                                        🔑
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={(theme) => ({
                                        color: theme.palette.text.primary,
                                        fontWeight: 700,
                                        mb: 1,
                                    })}
                                >
                                    Zresetuj hasło
                                </Typography>
                                <Typography
                                    sx={(theme) => ({
                                        color: theme.palette.text.secondary,
                                        fontSize: 14,
                                    })}
                                >
                                    Wprowadź swój adres e-mail, aby otrzymać
                                    instrukcję resetowania hasła
                                </Typography>
                            </Box>

                            <Box
                                component="form"
                                onSubmit={handleForgotPasswordSubmit(
                                    handleSubmitForgotPasswordForm
                                )}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 3,
                                }}
                            >
                                <LabelTextInput
                                    label="E-mail"
                                    inputId="forgot-email"
                                    errorText={forgotErrors.email?.message}
                                    textFieldProps={{
                                        placeholder:
                                            "Wprowadź swój adres e-mail",
                                        ...forgotPasswordRegister("email"),
                                    }}
                                />

                                <Box sx={{ display: "flex", gap: 1.5 }}>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        fullWidth
                                        onClick={() =>
                                            setOpenForgotPasswordModal(false)
                                        }
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            fontSize: 14,
                                            fontWeight: 500,
                                            textTransform: "none",
                                        }}
                                    >
                                        Anuluj
                                    </Button>
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        loading={isLoadingForgotPasswordForm}
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            textTransform: "none",
                                        }}
                                    >
                                        Wyślij link
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Modal>
            </AuthPageWrapper>
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
}
