"use client";

import { useState } from "react";

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
        setAdditionalText("Wysłano e-mail ponownie.");

        console.log(data); // do poprawy podczas prac nad obsługą błędow
    };

    return <>{`Konto nieaktywne, ${userId}`}</>;
};

export default AccountNotActive;
