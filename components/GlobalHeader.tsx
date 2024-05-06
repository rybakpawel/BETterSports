"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const GlobalHeader = ({ userId }: { userId?: string }) => {
    const router = useRouter();

    const menu = ["Wydarzenia", "Obiekty", "Gadżety", "Stwórz turniej"];
    const userOptions = [
        {
            name: "Profil",
            href: `${process.env.NEXT_PUBLIC_URL}/user-profile/${userId}`,
        },
        {
            name: "Ustawienia",
            href: `${process.env.NEXT_PUBLIC_URL}/user-settings`,
        },
        { name: "Wyloguj", href: `` },
    ];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [profileImage, setProfileImage] = useState<null | string>("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/global-header-data/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.res.profileImage === null) setProfileImage("");
                else setProfileImage(data.res.profileImage.url);
            });
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {menu.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
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
                    <Box sx={{ flexGrow: 0, ml: "auto" }}>
                        <Tooltip title="Rozwiń">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={
                                        profileImage
                                            ? profileImage
                                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userOptions.map((option) => (
                                <MenuItem
                                    key={option.name}
                                    onClick={
                                        option.href === ""
                                            ? () => signOut()
                                            : () => router.push(option.href)
                                    }
                                    sx={{
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {option.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default GlobalHeader;
