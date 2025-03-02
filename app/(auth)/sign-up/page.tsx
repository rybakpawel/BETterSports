"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserClientValidation } from "@/validation/client/createUserClientValidation";
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
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ISignUpForm {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [signUpForm, setSignUpForm] = useState<ISignUpForm>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<ISignUpForm>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { email, username, password, confirmPassword } = signUpForm;

        const validationResult = createUserClientValidation(
            email,
            username,
            password,
            confirmPassword
        );

        if (!validationResult.success) {
            let newErrors = {
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
            };

            validationResult.error.issues.forEach((error) => {
                const fieldName = error.path[0];
                const errorMessage = error.message;
                if (newErrors[fieldName as keyof ISignUpForm]) return;
                newErrors[fieldName as keyof ISignUpForm] = errorMessage;
            });

            setError(newErrors);
            setIsLoading(false);
        } else {
            const body = {
                email: signUpForm.email,
                username: signUpForm.username,
                password: signUpForm.password,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create-user`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();
            console.log(data);
            if (!data.errorMessage) router.push(`/verification?id=${data.res}`); // do poprawy podczas prac nad obsługą błędów

            setIsLoading(false);

            console.log(data); // do poprawy podczas prac nad obsługą błędow
        }
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
                    <TextField
                        id="email"
                        name="email"
                        label="E-mail"
                        value={signUpForm.email}
                        onChange={(e) =>
                            setSignUpForm((prevState) => ({
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
                    <TextField
                        id="username"
                        name="username"
                        label="Nazwa użytkownika"
                        value={signUpForm.username}
                        onChange={(e) =>
                            setSignUpForm((prevState) => ({
                                ...prevState,
                                username: e.target.value,
                            }))
                        }
                        error={error.username !== ""}
                        helperText={error.username}
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: error.username ? 0 : 2,
                        }}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: error.password ? 0 : 2,
                        }}
                    >
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
                            value={signUpForm.password}
                            onChange={(e) =>
                                setSignUpForm((prevState) => ({
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
                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: 5,
                        }}
                    >
                        <InputLabel
                            htmlFor="confirmPassword"
                            error={error.confirmPassword !== ""}
                        >
                            Potwierdź hasło
                        </InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Potwierdź hasło"
                            type={showConfirmPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirmPassword visibility"
                                        onClick={() => {
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            );
                                        }}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={signUpForm.confirmPassword}
                            onChange={(e) =>
                                setSignUpForm((prevState) => ({
                                    ...prevState,
                                    confirmPassword: e.target.value,
                                }))
                            }
                            error={error.confirmPassword !== ""}
                        />
                        <FormHelperText error={error.confirmPassword !== ""}>
                            {error.confirmPassword !== ""
                                ? error.confirmPassword
                                : ""}
                        </FormHelperText>
                    </FormControl>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                        sx={{ mb: 2 }}
                    >
                        Zarejestruj
                    </LoadingButton>
                    <Link href={"/sign-in"}>
                        <Button fullWidth variant="outlined">
                            Logowanie
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
}
