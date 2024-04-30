"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function Verification() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [additionalText, setAdditionalText] = useState<string>("");
    const searchParams = useSearchParams();

    const handleResendEmail = async () => {
        setIsLoading(true);

        const userId = searchParams.get("id");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/resend-verification-email/${userId}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        setIsLoading(false);
        setAdditionalText("Wysłano e-mail ponownie.");

        console.log(data); // do poprawy podczas prac nad obsługą błędow
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
                    Konto utworzone!
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
                    Wysłaliśmy do Ciebie wiadomość e-mail zawierającą link
                    aktywacyjny dla Twojego konta. Prosimy o kliknięcie w
                    przesłany adres w celu weryfikacji.
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={isLoading ? true : false}
                    onClick={handleResendEmail}
                >
                    Wyślij ponownie e-mail
                </Button>

                <Typography
                    variant="body1"
                    sx={{ mt: 2, mb: 4, textAlign: "center" }}
                >
                    {additionalText}
                </Typography>
            </CardContent>
        </Card>
    );
}
