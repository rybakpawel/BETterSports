import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import { MailOutline, SportsSoccer } from "@mui/icons-material";
import MobileHeaderMenu from "./MobileHeaderMenu";
import HeaderUserMenu from "./HeaderUserMenu";
import { getGlobalHeaderData } from "@/logic/getGlobalHeaderData";

async function fetchProfileImage() {
    const result = await getGlobalHeaderData();

    if (result.success) {
        const profileImage = result.data?.profileImage;

        if (profileImage) return profileImage.url;
    }

    return "";
}

const GlobalHeader = async ({ userId }: { userId?: string }) => {
    const menu = ["Wydarzenia", "Obiekty", "Gadżety", "Stwórz turniej"];

    const profileImage: string = await fetchProfileImage();

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#1E1E1E", // bg-secondary
                borderBottom: "1px solid #374151", // border-gray-700
                zIndex: 50,
                top: 0,
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 }, py: 2 }}>
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minHeight: "auto",
                        position: "relative",
                        gap: { xs: 1, md: 0 },
                    }}
                >
                    {/* Mobile Menu - visible only on mobile */}
                    <Box
                        sx={{
                            display: { xs: "block", md: "none" },
                            flexShrink: 0,
                        }}
                    >
                        <MobileHeaderMenu />
                    </Box>

                    {/* Logo Section */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, md: 1.5 },
                            position: { xs: "absolute", md: "static" },
                            top: { xs: "50%" },
                            left: { xs: "50%" },
                            transform: {
                                xs: "translate(-50%, -50%)",
                                md: "translate(0, 0)",
                            },
                            flexShrink: 0,
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#F5C518", // bg-accent
                                p: { xs: 0.75, md: 1 },
                                borderRadius: 3, // rounded-xl
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <SportsSoccer
                                sx={{
                                    color: "#121212", // text-primary
                                    fontSize: 20, // text-xl
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                color: "#ffffff", // text-white
                                fontSize: 20, // text-xl
                                fontWeight: 700, // font-bold
                                display: { xs: "none", sm: "block" }, // Hide text on very small screens
                            }}
                        >
                            GroundHopper
                        </Typography>
                    </Box>

                    {/* Navigation Menu - hidden on mobile */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 4, // space-x-8
                        }}
                    >
                        {menu.map((page) => (
                            <Typography
                                key={page}
                                sx={{
                                    color: "#9CA3AF", // text-gray-400
                                    fontWeight: 500, // font-medium
                                    cursor: "pointer",
                                    transition: "color 0.2s",
                                    "&:hover": {
                                        color: "#ffffff", // hover:text-white
                                    },
                                }}
                            >
                                {page}
                            </Typography>
                        ))}
                    </Box>

                    {/* User Section */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, md: 2 },
                            flexShrink: 0,
                        }}
                    >
                        <IconButton
                            sx={{
                                color: "#9CA3AF", // text-gray-400
                                padding: { xs: 0.5, md: 1 },
                                "&:hover": {
                                    color: "#ffffff", // hover:text-white
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            <MailOutline sx={{ fontSize: 24 }} />
                        </IconButton>

                        <HeaderUserMenu
                            userId={userId}
                            profileImage={profileImage}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default GlobalHeader;
