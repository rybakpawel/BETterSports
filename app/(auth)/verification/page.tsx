"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import AuthPageWrapper from "@/components/sections/AuthPageWrapper";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function Verification() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] =
        useState<boolean>(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const handleResendEmail = async () => {
        setIsLoading(true);

        const userId = searchParams.get("id");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/resend-verification-email`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userId,
                cache: "no-store",
            }
        );

        const result = await response.json();

        setIsLoading(false);
        setApiResponse(result);
        setIsApiResponseVisible(true);
    };
    return (
        <>
            <AuthPageWrapper variant="verification">
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Success Message */}
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.palette.background.default,
                            p: 2,
                            borderRadius: 1,
                            border: `1px solid ${theme.palette.grey[600]}`,
                        })}
                    >
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.text.primary,
                                fontSize: 14,
                                lineHeight: 1.6,
                            })}
                        >
                            Twoje konto zostało pomyślnie utworzone. Wysłaliśmy
                            link aktywacyjny na Twój adres e-mail.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                fontSize: 14,
                            })}
                        >
                            Co dalej?
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#F5C518",
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#121212",
                                            fontSize: 12,
                                            fontWeight: 800,
                                        }}
                                    >
                                        ✓
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: "#9CA3AF",
                                        fontSize: 14,
                                    }}
                                >
                                    Sprawdź swoją skrzynkę odbiorczą (i folder
                                    spam).
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#F5C518",
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#121212",
                                            fontSize: 12,
                                            fontWeight: 800,
                                        }}
                                    >
                                        ✓
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: "#9CA3AF",
                                        fontSize: 14,
                                    }}
                                >
                                    Kliknij link aktywacyjny w wiadomości
                                    e-mail.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: "#F5C518",
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#121212",
                                            fontSize: 12,
                                            fontWeight: 800,
                                        }}
                                    >
                                        ✓
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: "#9CA3AF",
                                        fontSize: 14,
                                    }}
                                >
                                    Zacznij śledzić swoje stadionowe przygody!
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ pt: 1 }}>
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            loading={isLoading}
                            onClick={handleResendEmail}
                            sx={{ mb: 2 }}
                            startIcon={<Send />}
                        >
                            Wyślij ponownie e-mail
                        </LoadingButton>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => router.push("/sign-in")}
                            sx={{
                                backgroundColor: "#121212",
                                borderColor: "#4B5563",
                                color: "#9CA3AF",
                                "&:hover": {
                                    borderColor: "#4B5563",
                                    color: "#ffffff",
                                    backgroundColor: "#121212",
                                },
                            }}
                        >
                            Wróć do logowania
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ textAlign: "center", mt: 4, pt: 3 }}>
                    <Divider sx={{ borderColor: "#4B5563", mb: 2 }} />
                    <Typography
                        sx={{
                            color: "#9CA3AF",
                            fontSize: 12,
                        }}
                    >
                        Nie otrzymałeś wiadomości e-mail? Sprawdź folder spam
                        lub skontaktuj się z{" "}
                        <Typography
                            component="span"
                            sx={{
                                color: "#F5C518",
                                cursor: "pointer",
                                fontSize: 12,
                                "&:hover": {
                                    color: "#FBBF24",
                                },
                            }}
                        >
                            pomocą techniczną.
                        </Typography>
                    </Typography>
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
