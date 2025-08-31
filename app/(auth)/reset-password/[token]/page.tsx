"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
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
                        Wprowadź nowe hasło
                    </Typography>
                    <Box
                        component="form"
                        sx={{ my: 5 }}
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ mb: errors.password ? 0 : 2 }}
                            error={!!errors.password}
                        >
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                label="Hasło"
                                {...register("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
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
                                {errors.password?.message}
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 5 }}
                            error={!!errors.confirmPassword}
                        >
                            <InputLabel htmlFor="confirmPassword">
                                Potwierdź hasło
                            </InputLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                label="Potwierdź hasło"
                                {...register("confirmPassword")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
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
                            />
                            <FormHelperText>
                                {errors.confirmPassword?.message}
                            </FormHelperText>
                        </FormControl>

                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            loading={isLoading}
                        >
                            Ustaw hasło
                        </LoadingButton>
                    </Box>
                </CardContent>
            </Card>

            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
}
