"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";
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

        // client validation - do przemyślenia czy nie przenieść walidacji klienckich do osobnego katalogu
        const validationSchema = z
            .object({
                email: z
                    .string()
                    .email({ message: "Nieprawidłowy adres e-mail." }),
                username: z
                    .string()
                    .min(2, {
                        message:
                            "Nazwa użytkownika musi zawierać co najmniej 2 znaki.",
                    })
                    .max(20, {
                        message:
                            "Nazwa użytkownika może zawierać maksymalnie 20 znaków.",
                    })
                    .regex(
                        new RegExp(
                            "^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                        ),
                        { message: "Nieprawidłowa nazwa użytkownika." }
                    ),
                password: z
                    .string()
                    .min(8, {
                        message: "Hasło musi zawierać co najmniej 8 znaków.",
                    })
                    .regex(new RegExp(".*[A-Z].*"), {
                        message: "Hasło musi zawierać wielką literę.",
                    })
                    .regex(new RegExp(".*\\d.*"), {
                        message: "Hasło musi zawierać cyfrę.",
                    })
                    .regex(
                        new RegExp(
                            ".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"
                        ),
                        { message: "Hasło musi zawierać znak specjalny." }
                    ),
                confirmPassword: z
                    .string()
                    .min(1, { message: "Uzupełnij pole." }),
            })
            .superRefine(({ confirmPassword, password }, ctx) => {
                if (confirmPassword !== password) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["confirmPassword"],
                        message: "Hasła nie są takie same.",
                    });
                }
            });
        const validationResult = validationSchema.safeParse(signUpForm);

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
                            value={signUpForm.password}
                            onChange={(e) =>
                                setSignUpForm((prevState) => ({
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
                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: 5,
                        }}
                    >
                        <InputLabel
                            htmlFor="confirmPassword"
                            sx={{
                                color: "#666666",
                            }}
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
                                        sx={{
                                            color: "#666666",
                                        }}
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
                            sx={{
                                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#666666",
                                    },
                            }}
                        />
                        <FormHelperText error={error.confirmPassword !== ""}>
                            {error.confirmPassword !== ""
                                ? error.confirmPassword
                                : ""}
                        </FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading ? true : false}
                        sx={{ mb: 2 }}
                    >
                        Zarejestruj
                    </Button>
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
