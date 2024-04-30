import * as React from "react";

interface IEmailTemplateProps {
    resetPasswordToken?: string;
}

export const ResetPassword: React.FC<Readonly<IEmailTemplateProps>> = ({
    resetPasswordToken,
}) => (
    <div>
        <p>
            Wejdź w link, aby ustawić nowe hasło do konta BETter:{" "}
            {`${process.env.NEXT_PUBLIC_API_URL}/verify-reset-password/${resetPasswordToken}`}
        </p>
    </div>
);
