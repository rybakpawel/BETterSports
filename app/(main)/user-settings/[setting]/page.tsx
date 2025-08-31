import {
    Box,
    Card,
    CardContent,
    Container,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import UserDataForm from "@/components/sections/UserDataForm";
import AccountDataForm from "@/components/sections/AccountDataForm";
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
        <main>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    my: 5,
                }}
            >
                <Card sx={{ flexBasis: "25%" }}>
                    <CardContent
                        sx={{
                            p: 0,
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                p: "16px",
                            }}
                        >
                            Ustawienia
                        </Typography>
                        <List component="nav" sx={{ p: 0 }}>
                            <ListItemButton
                                selected={setting === "user-data"}
                                href="/user-settings/user-data"
                            >
                                <ListItemText
                                    primary="Dane użytkownika"
                                    sx={{
                                        color:
                                            setting === "user-data"
                                                ? "background.default"
                                                : "inherit",
                                        "&:hover": {
                                            color:
                                                setting === "user-data"
                                                    ? "background.default"
                                                    : "primary.main",
                                        },
                                    }}
                                />
                            </ListItemButton>

                            <ListItemButton
                                selected={setting === "account-data"}
                                href="/user-settings/account-data"
                            >
                                <ListItemText
                                    primary="Dane konta"
                                    sx={{
                                        color:
                                            setting === "account-data"
                                                ? "background.default"
                                                : "inherit",
                                        "&:hover": {
                                            color:
                                                setting === "account-data"
                                                    ? "background.default"
                                                    : "primary.main",
                                        },
                                    }}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={setting === "preferences"}
                                href="/user-settings/preferences"
                            >
                                <ListItemText
                                    primary="Preferencje"
                                    sx={{
                                        color:
                                            setting === "preferences"
                                                ? "background.default"
                                                : "inherit",
                                        "&:hover": {
                                            color:
                                                setting === "preferences"
                                                    ? "background.default"
                                                    : "primary.main",
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </List>
                    </CardContent>
                </Card>
                <Box sx={{ flexBasis: "65%" }}>
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
                            profileImageName={settings?.profileImageName ?? ""}
                            profileImageUrl={settings?.profileImageUrl ?? ""}
                            backgroundImageId={settings?.backgroundImageId ?? 0}
                            backgroundImageName={
                                settings?.backgroundImageName ?? ""
                            }
                            backgroundImageUrl={
                                settings?.backgroundImageUrl ?? ""
                            }
                            favouriteSportId={settings?.favouriteSportId ?? 0}
                            isFavouriteSportIndividual={
                                settings?.isFavouriteSportIndividual ?? false
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
                    {setting === "preferences" ? null : null}
                </Box>
            </Container>
        </main>
    );
}
