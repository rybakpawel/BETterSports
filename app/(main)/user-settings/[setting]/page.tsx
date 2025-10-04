import {
    Box,
    Card,
    CardContent,
    Container,
    Typography,
    Button,
} from "@mui/material";
import { Settings, Person, CreditCard, Tune } from "@mui/icons-material";
import UserDataForm from "@/components/sections/UserDataForm";
import AccountDataForm from "@/components/sections/AccountDataForm";
import UserPreferencesForm from "@/components/sections/UserPreferencesForm";
import { getUserSettings } from "@/logic/getUserSettings";
import { getSports } from "@/logic/getSports";
import { getCountries } from "@/logic/getCountries";

type FormList = {
    id: number;
    name: string;
};

async function fetchCountries() {
    const result = await getCountries();

    if (!result.success || !result.data) {
        return [];
    }

    return result.data.countries;
}

async function fetchSports() {
    const result = await getSports();

    if (!result.success || !result.data) {
        return [];
    }

    return result.data.sports;
}

async function fetchSettings() {
    const result = await getUserSettings();

    return result.data?.settings;
}

export default async function UserSettings({
    params,
}: {
    params: { setting: string };
}) {
    const { setting } = params;

    const countries: FormList[] = await fetchCountries();
    const sports: FormList[] = await fetchSports();
    const settings = await fetchSettings();

    return (
        <Box sx={{ backgroundColor: "#121212", minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ px: 6, py: 8 }}>
                {/* Settings Header */}
                <Box sx={{ mb: 4, maxWidth: 1200, mx: "auto" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 0.5,
                        }}
                    >
                        <Settings sx={{ color: "#F5C518", fontSize: 30 }} />
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#ffffff",
                                fontWeight: 700,
                                fontSize: 30,
                            }}
                        >
                            Ustawienia
                        </Typography>
                    </Box>
                    <Typography sx={{ color: "#9CA3AF", fontSize: 16 }}>
                        Zarządzaj swoim kontem i preferencjami
                    </Typography>
                </Box>

                {/* Settings Container */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        maxWidth: 1200,
                        mx: "auto",
                        flexDirection: { xs: "column", lg: "row" },
                    }}
                >
                    {/* Settings Sidebar */}
                    <Box
                        sx={{
                            width: { xs: "100%", lg: "25%" },
                            flexShrink: 0,
                        }}
                    >
                        <Card
                            sx={{
                                position: "sticky",
                                top: 96,
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        variant={
                                            setting === "user-data"
                                                ? "contained"
                                                : "text"
                                        }
                                        startIcon={<Person />}
                                        href="/user-settings/user-data"
                                        sx={{
                                            justifyContent: "flex-start",
                                            textAlign: "left",
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor:
                                                setting === "user-data"
                                                    ? "#F5C518"
                                                    : "transparent",
                                            color:
                                                setting === "user-data"
                                                    ? "#121212"
                                                    : "#9CA3AF",
                                            fontWeight:
                                                setting === "user-data"
                                                    ? 500
                                                    : 400,
                                            "&:hover": {
                                                backgroundColor:
                                                    setting === "user-data"
                                                        ? "#F5C518"
                                                        : "transparent",
                                                color:
                                                    setting === "user-data"
                                                        ? "#121212"
                                                        : "#ffffff",
                                            },
                                        }}
                                    >
                                        Dane użytkownika
                                    </Button>
                                    <Button
                                        variant={
                                            setting === "account-data"
                                                ? "contained"
                                                : "text"
                                        }
                                        startIcon={<CreditCard />}
                                        href="/user-settings/account-data"
                                        sx={{
                                            justifyContent: "flex-start",
                                            textAlign: "left",
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor:
                                                setting === "account-data"
                                                    ? "#F5C518"
                                                    : "transparent",
                                            color:
                                                setting === "account-data"
                                                    ? "#121212"
                                                    : "#9CA3AF",
                                            fontWeight:
                                                setting === "account-data"
                                                    ? 500
                                                    : 400,
                                            "&:hover": {
                                                backgroundColor:
                                                    setting === "account-data"
                                                        ? "#F5C518"
                                                        : "transparent",
                                                color:
                                                    setting === "account-data"
                                                        ? "#121212"
                                                        : "#ffffff",
                                            },
                                        }}
                                    >
                                        Dane konta
                                    </Button>
                                    <Button
                                        variant={
                                            setting === "preferences"
                                                ? "contained"
                                                : "text"
                                        }
                                        startIcon={<Tune />}
                                        href="/user-settings/preferences"
                                        sx={{
                                            justifyContent: "flex-start",
                                            textAlign: "left",
                                            px: 2,
                                            py: 1.5,
                                            backgroundColor:
                                                setting === "preferences"
                                                    ? "#F5C518"
                                                    : "transparent",
                                            color:
                                                setting === "preferences"
                                                    ? "#121212"
                                                    : "#9CA3AF",
                                            fontWeight:
                                                setting === "preferences"
                                                    ? 500
                                                    : 400,
                                            "&:hover": {
                                                backgroundColor:
                                                    setting === "preferences"
                                                        ? "#F5C518"
                                                        : "transparent",
                                                color:
                                                    setting === "preferences"
                                                        ? "#121212"
                                                        : "#ffffff",
                                            },
                                        }}
                                    >
                                        Preferencje
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Settings Content */}
                    <Box
                        sx={{
                            width: { xs: "100%", lg: "75%" },
                            flexGrow: 1,
                        }}
                    >
                        {setting === "user-data" ? (
                            <UserDataForm
                                name={settings?.name ?? ""}
                                lastName={settings?.lastName ?? ""}
                                birthDate={settings?.birthDate ?? null}
                                gender={settings?.gender ?? ""}
                                nationalityId={settings?.nationalityId ?? 0}
                                cityId={settings?.cityId ?? 0}
                                cityName={settings?.cityName ?? ""}
                                nationalitiesList={countries}
                            />
                        ) : null}
                        {setting === "account-data" ? (
                            <AccountDataForm
                                username={settings?.username ?? ""}
                                profileImageId={settings?.profileImageId ?? 0}
                                profileImageName={
                                    settings?.profileImageName ?? ""
                                }
                                profileImageUrl={
                                    settings?.profileImageUrl ?? ""
                                }
                                backgroundImageId={
                                    settings?.backgroundImageId ?? 0
                                }
                                backgroundImageName={
                                    settings?.backgroundImageName ?? ""
                                }
                                backgroundImageUrl={
                                    settings?.backgroundImageUrl ?? ""
                                }
                                favouriteSportId={
                                    settings?.favouriteSportId ?? 0
                                }
                                isFavouriteSportIndividual={
                                    settings?.isFavouriteSportIndividual ??
                                    false
                                }
                                favouriteTeamId={settings?.favouriteTeamId ?? 0}
                                favouriteTeamName={
                                    settings?.favouriteTeamName ?? ""
                                }
                                primaryColor={settings?.primaryColor ?? ""}
                                secondaryColor={settings?.secondaryColor ?? ""}
                                sportsList={sports}
                            />
                        ) : null}
                        {setting === "preferences" ? (
                            <UserPreferencesForm
                                showOnlyFavoriteSportContent={
                                    settings?.showOnlyFavoriteSportContent ??
                                    false
                                }
                                prioritizeNearbyEvents={
                                    settings?.prioritizeNearbyEvents ?? false
                                }
                                showFriendActivitiesInFeed={
                                    settings?.showFriendActivitiesInFeed ??
                                    false
                                }
                                pushNewEventsNearby={
                                    settings?.pushNewEventsNearby ?? false
                                }
                                pushFriendActivities={
                                    settings?.pushFriendActivities ?? false
                                }
                                pushChallengeUpdates={
                                    settings?.pushChallengeUpdates ?? false
                                }
                                pushTournamentUpdates={
                                    settings?.pushTournamentUpdates ?? false
                                }
                                emailEventReminders={
                                    settings?.emailEventReminders ?? false
                                }
                                emailTournamentReminders={
                                    settings?.emailTournamentReminders ?? false
                                }
                                emailWeeklyDigest={
                                    settings?.emailWeeklyDigest ?? false
                                }
                            />
                        ) : null}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
