"use client";

import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";

const AccountNotActive = ({ userId }: { userId?: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] =
        useState<boolean>(false);

    const handleResendEmail = async () => {
        setIsLoading(true);

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
                    mx: "25vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <CardContent sx={{ m: 3, mb: 0 }}>
                    <Typography variant="h5" component="h1">
                        Konto nie jest aktywne!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                        Aktywuj konto żeby móc w pełni korzystać z serwisu. W
                        przypadku braku kodu aktywacyjnego kliknij w poniższy
                        przycisk w celu przesłania go przez nas na Twój adres
                        e-mail.
                    </Typography>
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        loading={isLoading}
                        onClick={handleResendEmail}
                    >
                        Wyślij kod
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
};

export default AccountNotActive;
