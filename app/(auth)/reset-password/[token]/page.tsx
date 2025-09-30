"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LabelTextInput from "@/components/form/LabelTextInput";
import AuthPageWrapper from "@/components/sections/AuthPageWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    resetPasswordValidation,
    ResetPasswordType,
} from "@/validation/common/resetPasswordValidation";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] =
        useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        resolver: zodResolver(resetPasswordValidation),
    });
    const router = useRouter();
    const { token } = useParams<{ token: string }>();

    const handleSubmitForm = async (data: ResetPasswordType) => {
        setIsLoading(true);

        const body = {
            token,
            newPassword: data.password,
            confirmPassword: data.confirmPassword,
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        if (result.success) router.push(`/sign-in?changedpassword=true`);
        else {
            setIsLoading(false);
            setApiResponse(result);
            setIsApiResponseVisible(true);
        }
    };

    return (
        <>
            <AuthPageWrapper variant="reset-password">
                <Box
                    component="form"
                    sx={{ my: 5 }}
                    onSubmit={handleSubmit(handleSubmitForm)}
                >
                    <LabelTextInput
                        label="Hasło"
                        inputId="password"
                        isPassword={true}
                        errorText={errors.password?.message}
                        textFieldProps={{
                            placeholder: "Wprowadź nowe hasło",
                            ...register("password"),
                        }}
                    />
                    <LabelTextInput
                        label="Potwierdź hasło"
                        inputId="confirmPassword"
                        isPassword={true}
                        errorText={errors.confirmPassword?.message}
                        textFieldProps={{
                            placeholder: "Potwierdź nowe hasło",
                            ...register("confirmPassword"),
                        }}
                    />

                    <Box sx={{ mt: 4 }}>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loading={isLoading}
                            sx={{ mb: 2 }}
                        >
                            Ustaw hasło
                        </LoadingButton>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => router.push("/sign-in")}
                            sx={(theme) => ({
                                backgroundColor:
                                    theme.palette.background.default,
                                borderColor: theme.palette.grey[600],
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    borderColor: theme.palette.grey[600],
                                    color: theme.palette.text.primary,
                                    backgroundColor:
                                        theme.palette.background.default,
                                },
                            })}
                        >
                            Wróć do logowania
                        </Button>
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
