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
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ISignInForm {
    email: string;
    password: string;
}

export default function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
        if (isLoading) return;
        setOpenForgotPasswordModal(state);
        setForgotPasswordForm("");
    };

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await signIn("credentials", {
            email: signInForm.email,
            password: signInForm.password,
            callbackUrl: "/",
        });

        if (!response?.ok) {
            setIsLoading(false);
            console.log("Nieprawidłowy e-mail lub hasło."); // do poprawy podczas obsługi błędów
        }
    };

    const handleSubmitForgotPasswordForm = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);

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

        setIsLoading(false);
    };

    return (
        <Card
            sx={{
                my: "5vh",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CardContent sx={{ m: 3 }}>
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
                            sx={{
                                color: "#666666",
                            }}
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
                                        sx={{
                                            color: "#666666",
                                        }}
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
                            sx={{
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#666666",
                                    },
                            }}
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
                    <Button
                        type="submit"
                        fullWidth={true}
                        variant="contained"
                        disabled={isLoading ? true : false}
                        sx={{ mb: 2 }}
                    >
                        Zaloguj
                    </Button>
                    <Link href={"/sign-up"}>
                        <Button fullWidth={true} variant="outlined">
                            Rejestracja
                        </Button>
                    </Link>
                </Box>
                <Modal
                    open={openForgotPasswordModal}
                    onClose={() => handleForgotPasswordModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        mx: "auto",
                        width: "20vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
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
                                        onSubmit={
                                            handleSubmitForgotPasswordForm
                                        }
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
                                        <Button
                                            type="submit"
                                            fullWidth={true}
                                            variant="contained"
                                            disabled={isLoading ? true : false}
                                            sx={{ mb: 2 }}
                                        >
                                            Wyślij na e-mail
                                        </Button>
                                    </Box>{" "}
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6" component="h3">
                                        Sukces!
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        Wysłaliśmy na Twój e-mail link oraz
                                        instrukcję umożliwiające ustawienie
                                        nowego hasła na Twoje konto.
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Modal>
            </CardContent>
        </Card>
    );
}
