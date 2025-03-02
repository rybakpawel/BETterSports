"use client";

import { createTheme } from "@mui/material/styles";
import { Hanken_Grotesk } from "next/font/google";

const hankenGroteskSans = Hanken_Grotesk({
    weight: ["300", "400", "500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

// Greys:
// #333333
// #404040
// #4C4C4C
// #595959
// #666666

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#333333",
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    margin: "1.5rem",
                    "&:last-child": {
                        paddingBottom: "1rem",
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-root:not(.Mui-error)": {
                        color: "#666666", // kolor placeholdera w inpucie
                    },
                    "&:hover .MuiInputLabel-root:not(.Mui-error)": {
                        color: "#ffe400", // kolor placeholdera w inpucie po najechaniu
                    },
                    "& .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
                        color: "#ffe400", // kolor placeholdera w inpucie po kliknięciu
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#666666", // kolor obramowania
                    },
                    "& .MuiOutlinedInput-root:not(.Mui-error)": {
                        "&:hover fieldset": {
                            borderColor: "#ffe400", // kolor obramowania po najechaniu
                            transition: "0.3s",
                        },
                        "&:hover .MuiIconButton-root": {
                            color: "#ffe400", // kolor ikony po najechaniu
                            transition: "color 0.3s",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#ffe400", // kolor obramowania po kliknięciu
                        },
                        "&.Mui-focused .MuiIconButton-root": {
                            color: "#ffe400", // kolor ikony po kliknięciu
                            transition: "color 0.3s",
                        },
                    },
                    input: {
                        "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px #333333 inset",
                            WebkitTextFillColor: "#fff",
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#666666", // Domyślny kolor ikony
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "000000",
                        backgroundColor: "#ffe400",
                    },
                    "&.Mui-selected:hover": {
                        color: "000000",
                        backgroundColor: "#ffe400",
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "#ffe400",
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "#333333",
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: "rgb(118, 118, 118)",
                    transition: "all 0.5s ease",
                    borderColor: "rgb(118, 118, 118)",
                    "&:hover": {
                        color: "#ffe400",
                        // backgroundColor: "#ffe400",
                        // borderColor: "#ffe400",
                    },
                    "&.Mui-selected": {
                        color: "#272727",
                        backgroundColor: "#ffe400",
                        borderColor: "#ffe400",
                    },
                    "&.Mui-selected:hover": {
                        color: "#272727",
                        backgroundColor: "#ffe400",
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    "& .MuiSvgIcon-root": {
                        color: "rgb(118, 118, 118)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgb(118, 118, 118)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffe400",
                    },
                    "&:hover .MuiSvgIcon-root": {
                        color: "#ffe400",
                    },
                    "&.Mui-focused .MuiSelect-select": {
                        color: "#ffe400", // kolor tekstu, gdy select jest zaznaczony
                    },
                    "&.Mui-focused .MuiSvgIcon-root, &.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            color: "#ffe400",
                            borderColor: "#ffe400",
                        },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        // backgroundColor: "#ffe400",
                        color: "#ffe400",
                        transition: "all 0.5s ease",
                    },
                    "&:focus": {
                        backgroundColor: "#ffe400",
                        color: "#272727",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#ffe400",
                        color: "#272727",
                        "&:hover": {
                            backgroundColor: "#ffe400",
                            color: "#272727",
                        },
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    "& .MuiAutocomplete-popupIndicator": {
                        color: "rgb(118, 118, 118)",
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                        color: "rgb(118, 118, 118)",
                    },
                    "&:hover .MuiAutocomplete-popupIndicator, &:hover .MuiAutocomplete-clearIndicator":
                        {
                            color: "#fff",
                        },
                    "&:focus-within .MuiAutocomplete-popupIndicator, &:focus-within .MuiAutocomplete-clearIndicator":
                        {
                            color: "#ffef66",
                        },
                },
                listbox: {
                    ".MuiAutocomplete-option": {
                        backgroundColor: "#ffe400",
                        color: "#272727",
                        transition: "all 0.5s ease",
                        "&.Mui-focused": {
                            backgroundColor: "#ffe400",
                            color: "#272727",
                        },
                        '&[aria-selected="true"]': {
                            backgroundColor: "#272727",
                            color: "#fff",
                        },
                        '&.Mui-focused[aria-selected="true"]': {
                            backgroundColor: "#272727",
                            color: "#ffe400",
                        },
                    },
                },
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
    },
    palette: {
        primary: {
            light: "#ffef66",
            main: "#ffe400",
            dark: "#998900",
            contrastText: "#272727",
        },
        secondary: {
            light: "#ffb195",
            main: "#ff652f",
            dark: "#c83400",
            contrastText: "#272727",
        },
        background: {
            default: "#272727",
            paper: "#333333",
        },
        text: {
            primary: "#fff",
        },
    },
    typography: {
        button: {
            textTransform: "capitalize",
        },
        fontFamily: hankenGroteskSans.style.fontFamily,
    },
});

export default theme;
