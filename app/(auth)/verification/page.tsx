"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

export default function Verification() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] =
        useState<boolean>(false);

    const searchParams = useSearchParams();

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
                        Konto utworzone!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                        Wysłaliśmy do Ciebie wiadomość e-mail zawierającą link
                        aktywacyjny dla Twojego konta. Prosimy o kliknięcie w
                        przesłany adres w celu weryfikacji.
                    </Typography>
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                        onClick={handleResendEmail}
                    >
                        Wyślij ponownie e-mail
                    </LoadingButton>
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
