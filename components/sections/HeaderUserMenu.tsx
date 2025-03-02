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
                sx={{
                    mt: "45px",
                }}
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
                            option.href ===
                            `${process.env.NEXT_PUBLIC_URL}${pathname}`
                                ? true
                                : false
                        }
                        onClick={
                            option.href === ""
                                ? () => signOut()
                                : () => handleClickUserMenuOption(option.href)
                        }
                        sx={{
                            "&:hover": {
                                color:
                                    option.href ===
                                    `${process.env.NEXT_PUBLIC_URL}${pathname}`
                                        ? ""
                                        : "primary.main",
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
    );
};

export default HeaderUserMenu;
