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
