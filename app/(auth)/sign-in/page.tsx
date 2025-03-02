"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
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

interface ISignInForm {
    email: string;
    password: string;
}

export default function SignIn() {
    const [isLoadingLoginForm, setIsLoadingLoginForm] =
        useState<boolean>(false);
    const [isLoadingForgotPasswordForm, setIsLoadingForgotPasswordForm] =
        useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
        useState<boolean>(false);
    const [signInForm, setSignInForm] = useState<ISignInForm>({
        email: "",
        password: "",
    });
    const [forgotPasswordForm, setForgotPasswordForm] = useState<string>("");
    const [forgotPasswordEmailSended, setForgotPasswordEmailSended] =
        useState<boolean>(false);
    const [error, setError] = useState<ISignInForm>({
        email: "",
        password: "",
    });
    const searchParams = useSearchParams();

    const handleForgotPasswordModal = (state: boolean) => {
        if (isLoadingLoginForm) return;
        setOpenForgotPasswordModal(state);
        setForgotPasswordForm("");
    };

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingLoginForm(true);

        const response = await signIn("credentials", {
            email: signInForm.email,
            password: signInForm.password,
            callbackUrl: "/",
        });

        if (!response?.ok) {
            setIsLoadingLoginForm(false);
            console.log("Nieprawidłowy e-mail lub hasło."); // TODO do poprawy podczas obsługi błędów
        }
    };

    const handleSubmitForgotPasswordForm = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoadingForgotPasswordForm(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(forgotPasswordForm),
            }
        );

        const data = await response.json();

        console.log(data);

        setIsLoadingForgotPasswordForm(false);
        setForgotPasswordEmailSended(true);
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
                        onSubmit={handleSubmitForm}
                    >
                        {searchParams.get("changedpassword") ? (
                            <Typography
                                sx={{
                                    mb: 1,
                                }}
                            >
                                Hasło poprawnie zmienione
                            </Typography>
                        ) : null}
                        <TextField
                            id="email"
                            name="email"
                            label="E-mail"
                            value={signInForm.email}
                            onChange={(e) =>
                                setSignInForm((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                            error={error.email !== ""}
                            helperText={error.email}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: error.email ? 0 : 2,
                            }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel
                                htmlFor="password"
                                error={error.password !== ""}
                            >
                                Hasło
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                label="Hasło"
                                type={showPassword ? "text" : "password"}
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
                                value={signInForm.password}
                                onChange={(e) =>
                                    setSignInForm((prevState) => ({
                                        ...prevState,
                                        password: e.target.value,
                                    }))
                                }
                                error={error.password !== ""}
                            />
                            <FormHelperText error={error.password !== ""}>
                                {error.password !== "" ? error.password : ""}
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
                                onClick={() => handleForgotPasswordModal(true)}
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
                onClose={() => handleForgotPasswordModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-size="small"
            >
                <Card>
                    <CardContent sx={{ m: 3 }}>
                        {!forgotPasswordEmailSended ? (
                            <>
                                <Typography variant="h6" component="h3">
                                    Zresetuj hasło
                                </Typography>
                                <Box
                                    component="form"
                                    sx={{ mt: 5 }}
                                    onSubmit={handleSubmitForgotPasswordForm}
                                >
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="E-mail"
                                        value={forgotPasswordForm}
                                        onChange={(e) =>
                                            setForgotPasswordForm(
                                                e.target.value
                                            )
                                        }
                                        error={error.email !== ""}
                                        helperText={error.email}
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            mb: error.email ? 0 : 2,
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
                            </>
                        ) : (
                            <>
                                <Typography variant="h6" component="h3">
                                    Sukces!
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Wysłaliśmy na Twój e-mail link oraz
                                    instrukcję umożliwiające ustawienie nowego
                                    hasła na Twoje konto.
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </Card>
            </Modal>
        </>
    );
}
