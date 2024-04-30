import type { Metadata } from "next";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { Container, Grid } from "@mui/material";
import Image from "next/image";

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
                        <Grid container>
                            <Grid item xs={8}>
                                <Container
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        position: "relative",
                                    }}
                                >
                                    <Container
                                        sx={{
                                            width: "15vw",
                                            height: "5vh",
                                            position: "absolute",
                                            margin: "5vh 0 0 0",
                                        }}
                                    >
                                        <Image
                                            src={"/logo.png"}
                                            alt="logo"
                                            layout="fill"
                                            objectFit="contain"
                                        ></Image>
                                    </Container>
                                    <Image
                                        src={"/hero.png"}
                                        alt="hero"
                                        layout="fill"
                                        objectFit="contain"
                                    ></Image>
                                </Container>
                            </Grid>
                            <Grid item xs={3}>
                                {children}
                            </Grid>
                        </Grid>
                    </body>
                </ThemeProvider>
            </StyledEngineProvider>
        </html>
    );
}
