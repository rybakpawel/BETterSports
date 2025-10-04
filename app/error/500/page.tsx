"use client";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    Avatar,
} from "@mui/material";
import {
    Refresh,
    ArrowBack,
    Home,
    Support,
    Forum,
    Book,
    Error,
} from "@mui/icons-material";

export default function Error500Page() {
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 4,
            }}
        >
            <Container maxWidth="md">
                <Card>
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                        {/* Error Icon */}
                        <Box sx={{ mb: 4 }}>
                            <Avatar
                                sx={(theme) => ({
                                    width: 128,
                                    height: 128,
                                    mx: "auto",
                                    mb: 3,
                                    backgroundColor:
                                        theme.palette.background.default,
                                    border: `1px solid ${theme.palette.grey[600]}`,
                                    boxShadow: 3,
                                })}
                            >
                                <Error
                                    sx={(theme) => ({
                                        fontSize: 60,
                                        color: theme.palette.error.main,
                                    })}
                                />
                            </Avatar>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={(theme) => ({
                                        width: 12,
                                        height: 12,
                                        backgroundColor:
                                            theme.palette.error.main,
                                        borderRadius: "50%",
                                        animation: "pulse 1.5s infinite",
                                        "&:nth-of-type(2)": {
                                            animationDelay: "0.2s",
                                        },
                                        "&:nth-of-type(3)": {
                                            animationDelay: "0.4s",
                                        },
                                    })}
                                />
                                <Box
                                    sx={(theme) => ({
                                        width: 12,
                                        height: 12,
                                        backgroundColor:
                                            theme.palette.error.main,
                                        borderRadius: "50%",
                                        animation: "pulse 1.5s infinite",
                                        animationDelay: "0.2s",
                                    })}
                                />
                                <Box
                                    sx={(theme) => ({
                                        width: 12,
                                        height: 12,
                                        backgroundColor:
                                            theme.palette.error.main,
                                        borderRadius: "50%",
                                        animation: "pulse 1.5s infinite",
                                        animationDelay: "0.4s",
                                    })}
                                />
                            </Box>
                        </Box>

                        {/* Error Content */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h1"
                                sx={(theme) => ({
                                    fontSize: { xs: "4rem", md: "6rem" },
                                    fontWeight: 700,
                                    color: theme.palette.primary.main,
                                    mb: 2,
                                })}
                            >
                                500
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    mb: 3,
                                })}
                            >
                                Server Error
                            </Typography>
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                    fontSize: "1.25rem",
                                    mb: 2,
                                    lineHeight: 1.6,
                                })}
                            >
                                Ups! Coś poszło nie tak po naszej stronie. Nasz
                                zespół został powiadomiony i pracujemy nad
                                rozwiązaniem tego problemu.
                            </Typography>
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                    fontSize: "1.125rem",
                                })}
                            >
                                Nie martw się, Twoje wizyty na stadionie i
                                kolekcja gadżetów są bezpieczne!
                            </Typography>
                        </Box>

                        {/* Error Actions */}
                        <Box sx={{ mb: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    gap: 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    startIcon={<Refresh />}
                                    onClick={handleRefresh}
                                    sx={(theme) => ({
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                        fontWeight: 600,
                                        px: 4,
                                        py: 2,
                                        fontSize: "1.125rem",
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.primary.light,
                                        },
                                    })}
                                >
                                    Spróbuj ponownie
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    onClick={handleGoBack}
                                    sx={(theme) => ({
                                        borderColor: theme.palette.grey[600],
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                        px: 4,
                                        py: 2,
                                        fontSize: "1.125rem",
                                        "&:hover": {
                                            borderColor:
                                                theme.palette.grey[600],
                                            backgroundColor:
                                                theme.palette.background
                                                    .default,
                                        },
                                    })}
                                >
                                    Powrót
                                </Button>
                            </Box>

                            <Button
                                variant="text"
                                startIcon={<Home />}
                                onClick={handleGoHome}
                                sx={(theme) => ({
                                    color: theme.palette.info.main,
                                    fontSize: "1.125rem",
                                    fontWeight: 500,
                                    "&:hover": {
                                        color: theme.palette.primary.main,
                                        backgroundColor: "transparent",
                                    },
                                })}
                            >
                                Powrót do strony głównej
                            </Button>
                        </Box>

                        {/* Help Section */}
                        <Card
                            sx={(theme) => ({
                                backgroundColor:
                                    theme.palette.background.default,
                                border: `1px solid ${theme.palette.grey[600]}`,
                                mb: 3,
                            })}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h5"
                                    sx={(theme) => ({
                                        color: theme.palette.text.primary,
                                        fontWeight: 600,
                                        mb: 3,
                                    })}
                                >
                                    Potrzebujesz pomocy?
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: {
                                            xs: "column",
                                            md: "row",
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={(theme) => ({
                                            flex: 1,
                                            p: 2,
                                            backgroundColor:
                                                theme.palette.background.paper,
                                            borderRadius: 2,
                                            textAlign: "center",
                                        })}
                                    >
                                        <Support
                                            sx={(theme) => ({
                                                fontSize: 32,
                                                color: theme.palette.primary
                                                    .main,
                                                mb: 1,
                                            })}
                                        />
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: "0.875rem",
                                            })}
                                        >
                                            Skontaktuj się z pomocą
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={(theme) => ({
                                            flex: 1,
                                            p: 2,
                                            backgroundColor:
                                                theme.palette.background.paper,
                                            borderRadius: 2,
                                            textAlign: "center",
                                        })}
                                    >
                                        <Forum
                                            sx={(theme) => ({
                                                fontSize: 32,
                                                color: theme.palette.info.main,
                                                mb: 1,
                                            })}
                                        />
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: "0.875rem",
                                            })}
                                        >
                                            Forum społeczności
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={(theme) => ({
                                            flex: 1,
                                            p: 2,
                                            backgroundColor:
                                                theme.palette.background.paper,
                                            borderRadius: 2,
                                            textAlign: "center",
                                        })}
                                    >
                                        <Book
                                            sx={(theme) => ({
                                                fontSize: 32,
                                                color: theme.palette.success
                                                    .main,
                                                mb: 1,
                                            })}
                                        />
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: "0.875rem",
                                            })}
                                        >
                                            Centrum pomocy
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Footer */}
                        <Box>
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                    fontSize: "0.875rem",
                                })}
                            >
                                Error ID:{" "}
                                <Box
                                    component="span"
                                    sx={(theme) => ({
                                        color: theme.palette.primary.main,
                                        fontFamily: "monospace",
                                    })}
                                >
                                    GH-500-2024-001
                                </Box>
                            </Typography>
                            <Typography
                                sx={(theme) => ({
                                    color: theme.palette.text.secondary,
                                    fontSize: "0.75rem",
                                    mt: 1,
                                })}
                            >
                                Jeśli ten problem będzie się powtarzał,
                                skontaktuj się z naszym zespołem pomocy z
                                identyfikatorem błędu powyżej.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
