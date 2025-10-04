"use client";

import { createTheme } from "@mui/material/styles";
import { Hanken_Grotesk } from "next/font/google";

// Extend MUI Card variants to support custom size variants
declare module "@mui/material/Card" {
    interface CardPropsVariantOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        full: true;
    }
}

declare module "@mui/material/Paper" {
    interface PaperPropsVariantOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        full: true;
    }
}

const hankenGroteskSans = Hanken_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const theme = createTheme({
    shape: {
        borderRadius: 12, // rounded-xl default
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#F5C518", // główny akcent UX Pilot
            light: "#ffdb4d",
            dark: "#b38f0e",
            contrastText: "#121212",
        },
        secondary: {
            main: "#0066CC", // niebieski akcent
            light: "#4da6ff",
            dark: "#004080",
            contrastText: "#ffffff",
        },
        success: {
            main: "#22C55E",
            contrastText: "#ffffff",
        },
        error: {
            main: "#EF4444",
            light: "#DC2626", // error hover
            dark: "#B91C1C",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#f59e0b",
            contrastText: "#121212",
        },
        info: {
            main: "#3B82F6", // info blue z aplikacji
            light: "#60A5FA",
            dark: "#1D4ED8",
            contrastText: "#ffffff",
        },
        grey: {
            900: "#121212", // główne tło
            800: "#1E1E1E", // tło kart
            700: "#374151", // hover background
            600: "#4B5563", // border color
            500: "#6B7280", // placeholder text
            400: "#9CA3AF", // secondary text
            300: "#666666", // disabled text
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
        text: {
            primary: "#ffffff",
            secondary: "#9CA3AF", // secondary text z aplikacji
            disabled: "#6B7280", // placeholder text z aplikacji
        },
        divider: "#4B5563", // border color z aplikacji
    },
    typography: {
        fontFamily: hankenGroteskSans.style.fontFamily,
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 500 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1E1E1E", // bg-secondary
                    borderRadius: "12px", // rounded-xl - spójne z przyciskami
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", // shadow-2xl
                    "&::before": {
                        display: "none !important", // Wyłącz Paper-overlay
                    },
                    "--Paper-overlay": "none !important", // Wyłącz CSS custom property
                },
            },
            variants: [
                {
                    props: { variant: "xs" },
                    style: {
                        width: "100%",
                        maxWidth: 320,
                        marginInline: "auto",
                    },
                },
                {
                    props: { variant: "sm" },
                    style: {
                        width: "100%",
                        maxWidth: 384,
                        marginInline: "auto",
                    },
                },
                {
                    props: { variant: "md" },
                    style: {
                        width: "100%",
                        maxWidth: 448,
                        marginInline: "auto",
                    },
                },
                {
                    props: { variant: "lg" },
                    style: {
                        width: "100%",
                        maxWidth: 512,
                        marginInline: "auto",
                    },
                },
                {
                    props: { variant: "xl" },
                    style: {
                        width: "100%",
                        maxWidth: 640,
                        marginInline: "auto",
                    },
                },
                {
                    props: { variant: "full" },
                    style: {
                        width: "100%",
                        marginInline: "auto",
                    },
                },
            ],
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "2rem", // p-8
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.disabled,
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    minWidth: "120px",
                    paddingBlock: "12px", // py: 1.5 = 12px
                    paddingInline: "32px", // px: 4 = 32px
                },
                containedPrimary: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                    borderRadius: theme.shape.borderRadius,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }),
                outlined: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    borderColor: theme.palette.grey[600],
                    color: theme.palette.text.secondary,
                    borderRadius: theme.shape.borderRadius,
                    "&:hover": {
                        borderColor: theme.palette.grey[600],
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                    },
                }),
                text: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    borderRadius: theme.shape.borderRadius,
                    "&:hover": {
                        color: theme.palette.primary.light,
                        backgroundColor: "transparent",
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    borderRadius: theme.shape.borderRadius,
                    border: `1px solid ${theme.palette.grey[600]}`,
                    "&:hover": {
                        borderColor: theme.palette.grey[600],
                    },
                    "&.Mui-focused": {
                        borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-error": {
                        borderColor: theme.palette.error.main,
                    },
                }),
                input: ({ theme }) => ({
                    color: theme.palette.text.primary,
                    padding: "12px 16px",
                    "&::placeholder": {
                        color: theme.palette.text.disabled,
                        opacity: 1,
                    },
                }),
                notchedOutline: {
                    border: "none",
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: "100%",
                    "&:hover .MuiAutocomplete-popupIndicator": {
                        color: theme.palette.text.primary,
                    },
                    "&.Mui-focused .MuiAutocomplete-popupIndicator": {
                        color: theme.palette.text.primary,
                    },
                }),
                listbox: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.grey[600]}`,
                    borderRadius: theme.shape.borderRadius,
                    maxHeight: "200px",
                    paddingBottom: "8px",
                    ".MuiAutocomplete-option": {
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.grey[700],
                        },
                        "&.Mui-focused": {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.grey[700],
                        },
                        '&[aria-selected="true"]': {
                            color: theme.palette.text.secondary,
                            backgroundColor: "transparent",
                        },
                        '&.Mui-focused[aria-selected="true"]': {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                }),
                popupIndicator: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                        backgroundColor: "transparent",
                    },
                }),
                clearIndicator: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                        backgroundColor: "transparent",
                    },
                }),
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: "12px 16px",
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                    },
                }),
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: ({ theme }) => ({
                    fontWeight: 500,
                    "&:hover": {
                        color: theme.palette.text.primary,
                    },
                }),
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                    },
                }),
                root: ({ theme }) => ({
                    "&:hover .MuiSelect-icon": {
                        color: theme.palette.text.primary,
                    },
                    "&.Mui-focused .MuiSelect-icon": {
                        color: theme.palette.text.primary,
                    },
                    "& .MuiMenuItem-root.Mui-selected": {
                        backgroundColor: `${theme.palette.background.default} !important`,
                        color: `${theme.palette.primary.main} !important`,
                    },
                }),
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.grey[600]}`,
                    borderRadius: theme.shape.borderRadius,
                }),
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    backgroundColor: `${theme.palette.background.default} !important`,
                    border: `1px solid ${theme.palette.grey[600]}`,
                    borderRadius: theme.shape.borderRadius,
                    "&::before": {
                        display: "none !important",
                    },
                    "--Paper-overlay": "none !important",
                }),
            },
        },
        MuiPopper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "& .MuiAutocomplete-noOptions": {
                        color: theme.palette.text.secondary,
                        backgroundColor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.grey[600]}`,
                        borderRadius: theme.shape.borderRadius,
                        margin: 0,
                        padding: 0,
                    },
                    "& .MuiAutocomplete-loading": {
                        color: theme.palette.text.secondary,
                        backgroundColor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.grey[600]}`,
                        borderRadius: theme.shape.borderRadius,
                    },
                }),
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: `${theme.palette.background.paper} !important`,
                    "&::before": {
                        display: "none !important",
                    },
                    "--Paper-overlay": "none !important",
                }),
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                    "&:hover": {
                        color: theme.palette.text.primary,
                        backgroundColor: "transparent",
                    },
                    "&.Mui-selected": {
                        color: `${theme.palette.primary.main} !important`,
                        backgroundColor: `${theme.palette.background.default} !important`,
                        "&:hover": {
                            color: `${theme.palette.primary.main} !important`,
                            backgroundColor: `${theme.palette.background.default} !important`,
                        },
                    },
                    "&.Mui-selected.Mui-focusVisible": {
                        backgroundColor: `${theme.palette.background.default} !important`,
                    },
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.text.primary,
                        },
                    },
                }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "& .MuiDateCalendar-root": {
                        backgroundColor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.grey[600]}`,
                        borderRadius: theme.shape.borderRadius,
                    },
                    "& .MuiPickersCalendarHeader-label": {
                        color: theme.palette.text.primary,
                    },
                    "& .MuiPickersCalendarHeader-labelContainer": {
                        backgroundColor: theme.palette.background.default,
                    },
                    "& .MuiPickersCalendar-root": {
                        backgroundColor: theme.palette.background.default,
                    },
                    "& .MuiDayCalendar-root": {
                        backgroundColor: theme.palette.background.default,
                    },
                    "& .MuiYearCalendar-root": {
                        backgroundColor: theme.palette.background.default,
                    },
                    "& .MuiMonthCalendar-root": {
                        backgroundColor: theme.palette.background.default,
                    },
                    "& .MuiPickersYear-yearButton": {
                        backgroundColor: theme.palette.background.default,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                    "& .MuiPickersMonth-monthButton": {
                        backgroundColor: theme.palette.background.default,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                }),
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "&.MuiPickersArrowSwitcher-button": {
                        color: theme.palette.text.primary,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                    "&.MuiPickersCalendarHeader-switchViewButton": {
                        color: theme.palette.text.primary,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                    "&.MuiPickersYear-yearButton": {
                        color: theme.palette.text.primary,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                    "&.MuiPickersMonth-monthButton": {
                        color: theme.palette.text.primary,
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                    },
                    "&.MuiPickersDay-root": {
                        "&:hover": {
                            backgroundColor: theme.palette.grey[700],
                        },
                        "&.Mui-selected": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                            },
                        },
                    },
                }),
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiCard-root": {
                        width: "80vw",
                    },
                    "@media (min-width:900px)": {
                        "&[data-size='small'] .MuiCard-root": {
                            width: "30vw",
                        },
                        "&[data-size='medium'] .MuiCard-root": {
                            width: "50vw",
                        },
                        "&[data-size='large'] .MuiCard-root": {
                            width: "80vw",
                        },
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                        "& + .MuiSwitch-track": {
                            backgroundColor: theme.palette.primary.main,
                        },
                    },
                }),
                switchBase: ({ theme }) => ({
                    "&.Mui-checked": {
                        color: theme.palette.primary.main,
                        "& + .MuiSwitch-track": {
                            backgroundColor: theme.palette.primary.main,
                        },
                    },
                }),
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                "@global": {
                    "@keyframes pulse": {
                        "0%": {
                            opacity: 1,
                        },
                        "50%": {
                            opacity: 0.5,
                        },
                        "100%": {
                            opacity: 1,
                        },
                    },
                },
            },
        },
    },
});

export default theme;
