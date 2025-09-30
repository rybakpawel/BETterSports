"use client";

import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MobileHeaderMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const menu = ["Wydarzenia", "Obiekty", "Gadżety", "Stwórz turniej"];

    return (
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
                sx={(theme) => ({
                    display: { xs: "block", md: "none" },
                    "& .MuiPaper-root": {
                        backgroundColor: `${theme.palette.background.paper} !important`,
                        border: `1px solid ${theme.palette.grey[600]}`,
                        borderRadius: 12,
                        "&::before": {
                            display: "none !important",
                        },
                        "--Paper-overlay": "none !important",
                    },
                })}
            >
                {menu.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default MobileHeaderMenu;
