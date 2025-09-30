"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";

interface IHeaderUserMenuProps {
    userId?: string;
    profileImage: string;
}

const HeaderUserMenu: React.FC<IHeaderUserMenuProps> = ({
    userId,
    profileImage,
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickUserMenuOption = (href: string) => {
        handleCloseUserMenu();
        router.push(href);
    };

    const userOptions = [
        {
            name: "Profil",
            href: `${process.env.NEXT_PUBLIC_URL}/user-profile/${userId}`,
        },
        {
            name: "Ustawienia",
            href: `${process.env.NEXT_PUBLIC_URL}/user-settings/user-data`,
        },
        { name: "Wyloguj", href: `` },
    ];

    return (
        <Box sx={{ flexGrow: 0, ml: "auto" }}>
            <Tooltip title="Rozwiń">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                sx={(theme) => ({
                    mt: "45px",
                    "& .MuiPaper-root": {
                        backgroundColor: `${theme.palette.background.paper} !important`,
                        border: `1px solid ${theme.palette.grey[600]}`,
                        borderRadius: 1,
                        "&::before": {
                            display: "none !important",
                        },
                        "--Paper-overlay": "none !important",
                    },
                })}
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
                <MenuItem
                    sx={{
                        display: "none", // Obejście problemu związanego z domyślnym zaznaczeniem pierwszej pozycji w Menu jeżeli nie powinna być zaznaczona żadna
                    }}
                ></MenuItem>
                {userOptions.map((option) => (
                    <MenuItem
                        key={option.name}
                        selected={
                            option.name === "Ustawienia"
                                ? pathname.includes("/user-settings/")
                                : option.href ===
                                  `${process.env.NEXT_PUBLIC_URL}${pathname}`
                        }
                        onClick={
                            option.href === ""
                                ? () => signOut()
                                : () => handleClickUserMenuOption(option.href)
                        }
                        sx={(theme) => ({
                            color: theme.palette.text.secondary,
                            backgroundColor: "transparent",
                            "&:hover": {
                                color: theme.palette.text.primary,
                                backgroundColor: "transparent",
                            },
                            "&.Mui-selected": {
                                color: theme.palette.text.primary,
                                backgroundColor: "transparent !important",
                                "&:hover": {
                                    color: theme.palette.text.primary,
                                    backgroundColor: "transparent !important",
                                },
                            },
                        })}
                    >
                        <Typography textAlign="center">
                            {option.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default HeaderUserMenu;
