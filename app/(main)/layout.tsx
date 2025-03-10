import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AuthProvider } from "@/components/sections/AuthProvider";
import { ThemeProvider } from "@mui/material";
import GlobalHeader from "@/components/sections/GlobalHeader";
import AccountNotActive from "@/components/sections/AccountNotActive";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
    title: "BETter Sports",
    description: "Social media application for groundhoppers",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="pl">
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <body>
                        <GlobalHeader userId={session?.user.id}></GlobalHeader>
                        {session?.user.isActive ? (
                            children
                        ) : (
                            <AccountNotActive
                                userId={session?.user?.id}
                            ></AccountNotActive>
                        )}
                    </body>
                </ThemeProvider>
            </AuthProvider>
        </html>
    );
}
