import * as React from "react";

interface IEmailTemplateProps {
    activateToken?: string;
}

export const VerifyUser: React.FC<Readonly<IEmailTemplateProps>> = ({
    activateToken,
}) => (
    <div>
        <h1>Witamy w BETter!</h1>
        <p>
            Aby aktywować swoje konto, kliknij w podany link:{" "}
            {`${process.env.NEXT_PUBLIC_API_URL}/verify-user/${activateToken}`}
        </p>
    </div>
);
