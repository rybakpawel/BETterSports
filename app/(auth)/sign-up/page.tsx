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
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function SignUp() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
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
                        onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <TextField
                            id="email"
                            label="E-mail"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message as string}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: errors.email ? 0 : 2.5,
                            }}
                        />
                        <TextField
                            id="username"
                            label="Nazwa użytkownika"
                            {...register("username")}
                            error={!!errors.username}
                            helperText={errors.username?.message as string}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: errors.username ? 0 : 2.5,
                            }}
                        />
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={!!errors.password}
                            sx={{
                                mb: errors.password ? 0 : 2.5,
                            }}
                        >
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Hasło"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
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
                                error={!!errors.password}
                            />
                            <FormHelperText error={!!errors.password}>
                                {errors.password?.message as string}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            variant="outlined"
                            fullWidth
                            error={!!errors.confirmPassword}
                            sx={{
                                mb: errors.confirmPassword ? 3 : 5.5,
                            }}
                        >
                            <InputLabel htmlFor="confirmPassword">
                                Potwierdź hasło
                            </InputLabel>
                            <OutlinedInput
                                id="confirmPassword"
                                label="Potwierdź hasło"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
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
                                error={!!errors.confirmPassword}
                            />
                            <FormHelperText error={!!errors.confirmPassword}>
                                {errors.confirmPassword?.message as string}
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
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
}
