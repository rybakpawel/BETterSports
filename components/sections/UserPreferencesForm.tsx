"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Card, CardContent, Typography, Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";
import ApiResponseAlert, {
    ApiResponse,
} from "@/components/alerts/ApiResponseAlert";
import {
    userPreferencesValidation,
    UserPreferencesType,
} from "@/validation/common/userPreferencesValidation";

interface IPreferencesFormProps {
    showOnlyFavoriteSportContent: boolean;
    prioritizeNearbyEvents: boolean;
    showFriendActivitiesInFeed: boolean;
    pushNewEventsNearby: boolean;
    pushFriendActivities: boolean;
    pushChallengeUpdates: boolean;
    pushTournamentUpdates: boolean;
    emailEventReminders: boolean;
    emailTournamentReminders: boolean;
    emailWeeklyDigest: boolean;
}

const UserPreferencesForm: React.FC<IPreferencesFormProps> = ({
    showOnlyFavoriteSportContent,
    prioritizeNearbyEvents,
    showFriendActivitiesInFeed,
    pushNewEventsNearby,
    pushFriendActivities,
    pushChallengeUpdates,
    pushTournamentUpdates,
    emailEventReminders,
    emailTournamentReminders,
    emailWeeklyDigest,
}) => {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isApiResponseVisible, setIsApiResponseVisible] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserPreferencesType>({
        resolver: zodResolver(userPreferencesValidation),
        defaultValues: {
            showOnlyFavoriteSportContent,
            prioritizeNearbyEvents,
            showFriendActivitiesInFeed,
            pushNewEventsNearby,
            pushFriendActivities,
            pushChallengeUpdates,
            pushTournamentUpdates,
            emailEventReminders,
            emailTournamentReminders,
            emailWeeklyDigest,
        },
    });

    const handleSubmitPreferencesForm = async (data: UserPreferencesType) => {
        setIsLoading(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/update-user-preferences`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        );

        const result = await response.json();

        setApiResponse(result);
        setIsApiResponseVisible(true);
        setIsLoading(false);
    };

    return (
        <>
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

                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleSubmitPreferencesForm)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
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
                                                color: theme.palette.text
                                                    .primary,
                                                fontWeight: 500,
                                            })}
                                        >
                                            Pokaż tylko treści z ulubionego
                                            sportu
                                        </Typography>
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Filtruj feed, aby pokazywać tylko
                                            Twój preferowany sport
                                        </Typography>
                                    </Box>
                                    <Controller
                                        name="showOnlyFavoriteSportContent"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
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
                                                color: theme.palette.text
                                                    .primary,
                                                fontWeight: 500,
                                            })}
                                        >
                                            Priorytetyzuj wydarzenia w pobliżu
                                        </Typography>
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Pokaż lokalne wydarzenia i stadiony
                                            jako pierwsze
                                        </Typography>
                                    </Box>
                                    <Controller
                                        name="prioritizeNearbyEvents"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
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
                                                color: theme.palette.text
                                                    .primary,
                                                fontWeight: 500,
                                            })}
                                        >
                                            Pokaż aktywności znajomych w feedzie
                                        </Typography>
                                        <Typography
                                            sx={(theme) => ({
                                                color: theme.palette.text
                                                    .secondary,
                                                fontSize: 14,
                                            })}
                                        >
                                            Wyświetlaj co robią Twoi znajomi
                                        </Typography>
                                    </Box>
                                    <Controller
                                        name="showFriendActivitiesInFeed"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
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
                                            <Controller
                                                name="pushNewEventsNearby"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                    />
                                                )}
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
                                            <Controller
                                                name="pushFriendActivities"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                    />
                                                )}
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
                                            <Controller
                                                name="pushChallengeUpdates"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                    />
                                                )}
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
                                            <Controller
                                                name="pushTournamentUpdates"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                    />
                                                )}
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
                                            <Controller
                                                name="emailWeeklyDigest"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                        sx={(theme) => ({
                                                            "& .MuiSwitch-switchBase.Mui-checked":
                                                                {
                                                                    color: theme
                                                                        .palette
                                                                        .info
                                                                        .main,
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
                                                )}
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
                                            <Controller
                                                name="emailEventReminders"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                        sx={(theme) => ({
                                                            "& .MuiSwitch-switchBase.Mui-checked":
                                                                {
                                                                    color: theme
                                                                        .palette
                                                                        .info
                                                                        .main,
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
                                                )}
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
                                            <Controller
                                                name="emailTournamentReminders"
                                                control={control}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        size="small"
                                                        sx={(theme) => ({
                                                            "& .MuiSwitch-switchBase.Mui-checked":
                                                                {
                                                                    color: theme
                                                                        .palette
                                                                        .info
                                                                        .main,
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
                                                )}
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
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={isLoading}
                                startIcon={<Save />}
                            >
                                Zapisz zmiany
                            </LoadingButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <ApiResponseAlert
                open={isApiResponseVisible}
                onClose={() => setIsApiResponseVisible(false)}
                response={apiResponse}
            />
        </>
    );
};

export default UserPreferencesForm;
