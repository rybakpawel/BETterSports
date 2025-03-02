import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

interface INationality {
    id: number;
    name: string;
}

interface ISport {
    id: number;
    name: string;
}

async function fetchCountries() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-countries`,
        {
            cache: "no-store",
        }
    );
    const { res } = await response.json();

    return res.countries;
}

async function fetchSports() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-sports`,
        {
            cache: "no-store",
        }
    );
    const { res } = await response.json();

    return res.sports;
}

async function fetchSettings(userId: string | undefined) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-settings/${userId}`,
        {
            cache: "no-store",
        }
    );
    const res = await response.json();

    return res.settings;
}
export default async function UserSettings({
    params,
}: {
    params: { setting: string };
}) {
    const { setting } = params;
    const session = await getServerSession(authOptions);

    const countries: INationality[] = await fetchCountries();
    const sports: ISport[] = await fetchSports();
    const {
        email,
        username,
        profileImageId,
        profileImageName,
        profileImageUrl,
        backgroundImageId,
        backgroundImageName,
        backgroundImageUrl,
        favouriteSportId,
        isFavouriteSportIndividual,
        favouriteTeamId,
        favouriteTeamName,
        cityId,
        cityName,
        primaryColor,
        secondaryColor,
        name,
        lastName,
        birthDate,
        gender,
        nationalityId,
    } = await fetchSettings(session?.user.id);

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
                            userId={session?.user.id}
                            name={name}
                            lastName={lastName}
                            birthDate={birthDate}
                            gender={gender}
                            nationalityId={nationalityId}
                            cityId={cityId}
                            cityName={cityName}
                            nationalitiesList={countries}
                        />
                    ) : null}
                    {setting === "account-data" ? (
                        <AccountDataForm
                            userId={session?.user.id}
                            username={username}
                            profileImageId={profileImageId}
                            profileImageName={profileImageName}
                            profileImageUrl={profileImageUrl}
                            backgroundImageId={backgroundImageId}
                            backgroundImageName={backgroundImageName}
                            backgroundImageUrl={backgroundImageUrl}
                            favouriteSportId={favouriteSportId}
                            isFavouriteSportIndividual={
                                isFavouriteSportIndividual
                            }
                            favouriteTeamId={favouriteTeamId}
                            favouriteTeamName={favouriteTeamName}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            sportsList={sports}
                        />
                    ) : null}
                    {setting === "preferences" ? null : null}
                </Box>
            </Container>
        </main>
    );
}
