import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MobileHeaderMenu from "./MobileHeaderMenu";
import HeaderUserMenu from "./HeaderUserMenu";

async function fetchProfileImage(userId: string | undefined) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/global-header-data/${userId}`,
        {
            cache: "no-store",
        }
    );
    const { res } = await response.json();

    if (res.profileImage) return res.profileImage.url;
}

const GlobalHeader = async ({ userId }: { userId?: string }) => {
    const menu = ["Wydarzenia", "Obiekty", "Gadżety", "Stwórz turniej"];

    const profileImage: string = await fetchProfileImage(userId);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        position: "relative",
                    }}
                >
                    <MobileHeaderMenu />
                    <Typography
                        sx={{
                            position: { xs: "absolute", md: "static" },
                            top: { xs: "50%" },
                            left: { xs: "50%" },
                            transform: {
                                xs: "translate(-50%, -50%)",
                                md: "translate(0, 0)",
                            },
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {menu.map((page) => (
                            <Button
                                key={page}
                                sx={{
                                    my: 2,
                                    mx: 0.5,
                                    color: "primary.contrastText",
                                    display: "block",
                                    "&:hover": {
                                        color: "primary.main",
                                        backgroundColor: "background.default",
                                    },
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <MailOutlineIcon sx={{ mx: "15px" }}></MailOutlineIcon>
                    <HeaderUserMenu
                        userId={userId}
                        profileImage={profileImage}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default GlobalHeader;
