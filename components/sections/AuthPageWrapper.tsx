"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";
import { SportsSoccer, Key, Email } from "@mui/icons-material";

interface AuthPageWrapperProps {
    children: ReactNode;
    variant?: "default" | "reset-password" | "verification";
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
    children,
    variant = "default",
}) => {
    const getHeaderContent = () => {
        if (variant === "reset-password") {
            return {
                icon: <Key sx={{ fontSize: 32 }} />,
                iconBg: "info.main",
                title: "Ustawianie hasła",
                description: "Link aktywacyjny został wysłany na Twoją pocztę",
            };
        }

        if (variant === "verification") {
            return {
                icon: <Email sx={{ fontSize: 32 }} />,
                iconBg: "success.main",
                title: "Konto utworzone!",
                description: "Wprowadź swoje nowe hasło, aby kontynuować",
            };
        }

        return {
            icon: <SportsSoccer sx={{ fontSize: 32 }} />,
            iconBg: "primary.main",
            title: "BETter",
            description: "Śledź swoje stadionowe podróże",
        };
    };

    const { icon, iconBg, title, description } = getHeaderContent();

    return (
        <Card variant="md">
            <CardContent sx={{ "&:last-child": { paddingBottom: "2rem" } }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor:
                                iconBg === "info.main"
                                    ? theme.palette.info.main
                                    : iconBg === "success.main"
                                    ? theme.palette.success.main
                                    : iconBg === "primary.main"
                                    ? theme.palette.primary.main
                                    : iconBg,
                            p: 2,
                            borderRadius: 3,
                            display: "inline-block",
                            mb: 2,
                        })}
                    >
                        <Box
                            sx={(theme) => ({
                                color: theme.palette.primary.contrastText,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            })}
                        >
                            {icon}
                        </Box>
                    </Box>
                    <Typography variant="h5" fontWeight={700}>
                        {title}
                    </Typography>
                    <Typography color="text.secondary" fontSize={14} mt={0.5}>
                        {description}
                    </Typography>
                </Box>
                {children}
            </CardContent>
        </Card>
    );
};

export default AuthPageWrapper;
