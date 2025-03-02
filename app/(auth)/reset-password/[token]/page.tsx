"use client";

import { useState } from "react";
import { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IResetPasswordForm {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [resetPasswordForm, setSignInForm] = useState<IResetPasswordForm>({
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<IResetPasswordForm>({
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();
    const params = useParams<{ token: string }>();

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // client validation - do przemyślenia czy nie przenieść walidacji klienckich do osobnego katalogu
        const validationSchema = z
            .object({
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
        const validationResult = validationSchema.safeParse(resetPasswordForm);

        if (!validationResult.success) {
            let newErrors = {
                password: "",
                confirmPassword: "",
            };

            validationResult.error.issues.forEach((error) => {
                const fieldName = error.path[0];
                const errorMessage = error.message;
                if (newErrors[fieldName as keyof IResetPasswordForm]) return;
                newErrors[fieldName as keyof IResetPasswordForm] = errorMessage;
            });

            setError(newErrors);
            setIsLoading(false);
        } else {
            const body = {
                token: params.token,
                newPassword: resetPasswordForm.password,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!data.errorMessage)
                router.push(`/sign-in?changedpassword=true`); // do poprawy podczas prac nad obsługą błędów

            setIsLoading(false);
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
                    Nowe hasło
                </Typography>
                <Box
                    component="form"
                    sx={{ my: 5 }}
                    onSubmit={handleSubmitForm}
                >
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
                            value={resetPasswordForm.password}
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
                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            mb: 5,
                        }}
                    >
                        <InputLabel
                            htmlFor="password"
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
                                        aria-label="toggle password visibility"
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
                            value={resetPasswordForm.confirmPassword}
                            onChange={(e) =>
                                setSignInForm((prevState) => ({
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
                    <LoadingButton
                        type="submit"
                        fullWidth={true}
                        variant="contained"
                        loading={isLoading}
                        sx={{ mb: 2 }}
                    >
                        Ustaw hasło
                    </LoadingButton>
                </Box>
            </CardContent>
        </Card>
    );
}
