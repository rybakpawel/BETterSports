"use client";

import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const AccountNotActive = ({ userId }: { userId?: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [additionalText, setAdditionalText] = useState<string>("");

    const handleResendEmail = async () => {
        setIsLoading(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/resend-verification-email/${userId}`,
            {
                cache: "no-store",
            }
        );

        const data = await response.json();
        setIsLoading(false);
        setAdditionalText("Wysłano kod aktywacyjny.");

        console.log(data); // do poprawy podczas prac nad obsługą błędow
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
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={isLoading ? true : false}
                        onClick={handleResendEmail}
                    >
                        Wyślij kod
                    </Button>

                    <Typography
                        variant="body1"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        {additionalText}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default AccountNotActive;
