"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createUserValidation,
    CreateUserType,
} from "@/validation/common/createUserValidation";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LabelTextInput from "@/components/form/LabelTextInput";
import AuthPageWrapper from "@/components/sections/AuthPageWrapper";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function SignUp() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserType>({
        resolver: zodResolver(createUserValidation),
    });

    // TODO dodać typ do 'data' (patrz: sign-in)
    const handleSubmitForm = async (data: any) => {
        setIsLoading(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/create-user`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        if (result.success) {
            router.push(`/verification?id=${result.data.userId}`); // zweryfikować
        } else {
            setApiResponse(result);
            setIsApiResponseVisible(true);
            setIsLoading(false);
        }
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
                    <Link href="/sign-in" style={{ width: "100%" }}>
                        <Button
                            variant="text"
                            fullWidth
                            sx={(theme) => ({
                                py: 1.5,
                                px: 2,
                                fontSize: 14,
                                fontWeight: 500,
                                textTransform: "none",
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    color: theme.palette.text.primary,
                                    backgroundColor: "transparent",
                                },
                            })}
                        >
                            Logowanie
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            py: 1.5,
                            px: 2,
                            fontSize: 14,
                            fontWeight: 500,
                            textTransform: "none",
                        }}
                    >
                        Rejestracja
                    </Button>
                </Box>
                <Box
                    component="form"
                    sx={{ my: 5 }}
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <LabelTextInput
                        label="E-mail"
                        inputId="email"
                        errorText={errors.email?.message as string}
                        textFieldProps={{
                            placeholder: "Wprowadź swój e-mail",
                            ...register("email"),
                        }}
                    />
                    <LabelTextInput
                        label="Nazwa użytkownika"
                        inputId="username"
                        errorText={errors.username?.message as string}
                        textFieldProps={{
                            placeholder: "Wybierz nazwę użytkownika",
                            ...register("username"),
                        }}
                    />
                    <LabelTextInput
                        label="Hasło"
                        inputId="password"
                        isPassword={true}
                        errorText={errors.password?.message as string}
                        textFieldProps={{
                            placeholder: "Stwórz hasło",
                            ...register("password"),
                        }}
                    />
                    <LabelTextInput
                        label="Potwierdź hasło"
                        inputId="confirmPassword"
                        isPassword={true}
                        errorText={errors.confirmPassword?.message as string}
                        textFieldProps={{
                            placeholder: "Potwierdź swoje hasło",
                            ...register("confirmPassword"),
                        }}
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                        sx={{ mt: 3, mb: 4 }}
                    >
                        Zarejestruj
                    </LoadingButton>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography color="text.secondary" fontSize={14}>
                            Masz już konto?{" "}
                            <Link
                                href="/sign-in"
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
                                    Zaloguj się
                                </Button>
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </AuthPageWrapper>
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
}
