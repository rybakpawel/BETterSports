"use client";

import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Switch,
    FormControlLabel,
    Button,
} from "@mui/material";
import { Save } from "@mui/icons-material";

const PreferencesForm: React.FC = () => {
    // Stan dla wszystkich przełączników
    const [preferences, setPreferences] = useState({
        // Content Personalization
        showOnlyFavoriteSportContent: true,
        prioritizeNearbyEvents: false,
        showFriendActivitiesInFeed: true,

        // Push Notifications
        pushNewEventsNearby: true,
        pushFriendActivities: false,
        pushChallengeUpdates: true,
        pushTournamentUpdates: true,

        // Email Notifications
        emailEventReminders: false,
        emailTournamentReminders: true,
        emailWeeklyDigest: true,
    });

    const handleSwitchChange = (key: keyof typeof preferences) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSave = () => {
        // TODO: Implementacja zapisywania preferencji
        console.log("Saving preferences:", preferences);
    };

    return (
        <Card>
            <CardContent
                sx={{ p: 4, "&:last-child": { paddingBottom: "2rem" } }}
            >
                <Typography
                    variant="h4"
                    sx={(theme) => ({
                        color: theme.palette.text.primary,
                        fontWeight: 700,
                        mb: 3,
                    })}
                >
                    Preferencje
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {/* Content Personalization */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={(theme) => ({
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                mb: 3,
                            })}
                        >
                            Personalizacja treści
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                            fontWeight: 500,
                                        })}
                                    >
                                        Pokaż tylko treści z ulubionego sportu
                                    </Typography>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                            fontSize: 14,
                                        })}
                                    >
                                        Filtruj feed, aby pokazywać tylko Twój
                                        preferowany sport
                                    </Typography>
                                </Box>
                                <Switch
                                    checked={
                                        preferences.showOnlyFavoriteSportContent
                                    }
                                    onChange={() =>
                                        handleSwitchChange(
                                            "showOnlyFavoriteSportContent"
                                        )
                                    }
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                            fontWeight: 500,
                                        })}
                                    >
                                        Priorytetyzuj wydarzenia w pobliżu
                                    </Typography>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                            fontSize: 14,
                                        })}
                                    >
                                        Pokaż lokalne wydarzenia i stadiony jako
                                        pierwsze
                                    </Typography>
                                </Box>
                                <Switch
                                    checked={preferences.prioritizeNearbyEvents}
                                    onChange={() =>
                                        handleSwitchChange(
                                            "prioritizeNearbyEvents"
                                        )
                                    }
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                            fontWeight: 500,
                                        })}
                                    >
                                        Pokaż aktywności znajomych w feedzie
                                    </Typography>
                                    <Typography
                                        sx={(theme) => ({
                                            color: theme.palette.text.secondary,
                                            fontSize: 14,
                                        })}
                                    >
                                        Wyświetlaj co robią Twoi znajomi
                                    </Typography>
                                </Box>
                                <Switch
                                    checked={
                                        preferences.showFriendActivitiesInFeed
                                    }
                                    onChange={() =>
                                        handleSwitchChange(
                                            "showFriendActivitiesInFeed"
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Notification Preferences */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={(theme) => ({
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                mb: 3,
                            })}
                        >
                            Preferencje powiadomień
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 4,
                            }}
                        >
                            {/* Push Notifications */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={(theme) => ({
                                        color: theme.palette.primary.main,
                                        fontWeight: 500,
                                        mb: 2,
                                    })}
                                >
                                    Powiadomienia push
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Nowe wydarzenia w pobliżu
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.pushNewEventsNearby
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "pushNewEventsNearby"
                                                )
                                            }
                                            size="small"
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Aktywności znajomych
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.pushFriendActivities
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "pushFriendActivities"
                                                )
                                            }
                                            size="small"
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Aktualizacje wyzwań
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.pushChallengeUpdates
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "pushChallengeUpdates"
                                                )
                                            }
                                            size="small"
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Aktualizacje turniejów
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.pushTournamentUpdates
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "pushTournamentUpdates"
                                                )
                                            }
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            {/* Email Notifications */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={(theme) => ({
                                        color: theme.palette.info.main,
                                        fontWeight: 500,
                                        mb: 2,
                                    })}
                                >
                                    Powiadomienia e-mail
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Tygodniowy digest
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.emailWeeklyDigest
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "emailWeeklyDigest"
                                                )
                                            }
                                            size="small"
                                            sx={(theme) => ({
                                                "& .MuiSwitch-switchBase.Mui-checked":
                                                    {
                                                        color: theme.palette
                                                            .info.main,
                                                        "& + .MuiSwitch-track":
                                                            {
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .info
                                                                        .main,
                                                            },
                                                    },
                                            })}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Przypomnienia o wydarzeniach
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.emailEventReminders
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "emailEventReminders"
                                                )
                                            }
                                            size="small"
                                            sx={(theme) => ({
                                                "& .MuiSwitch-switchBase.Mui-checked":
                                                    {
                                                        color: theme.palette
                                                            .info.main,
                                                        "& + .MuiSwitch-track":
                                                            {
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .info
                                                                        .main,
                                                            },
                                                    },
                                            })}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Przypomnienia o turniejach
                                        </Typography>
                                        <Switch
                                            checked={
                                                preferences.emailTournamentReminders
                                            }
                                            onChange={() =>
                                                handleSwitchChange(
                                                    "emailTournamentReminders"
                                                )
                                            }
                                            size="small"
                                            sx={(theme) => ({
                                                "& .MuiSwitch-switchBase.Mui-checked":
                                                    {
                                                        color: theme.palette
                                                            .info.main,
                                                        "& + .MuiSwitch-track":
                                                            {
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .info
                                                                        .main,
                                                            },
                                                    },
                                            })}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Save Button */}
                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSave}
                        >
                            Zapisz zmiany
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PreferencesForm;
