import type { Metadata } from "next";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { Box, Container } from "@mui/material";

export const metadata: Metadata = {
    title: "BETter Sports",
    description: "Social media application for groundhoppers",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pl">
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <body>
                        <Box
                            sx={{
                                minHeight: "100vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                px: 2,
                            }}
                        >
                            <Container maxWidth="sm" sx={{ px: 0 }}>
                                {children}
                            </Container>
                        </Box>
                    </body>
                </ThemeProvider>
            </StyledEngineProvider>
        </html>
    );
}
