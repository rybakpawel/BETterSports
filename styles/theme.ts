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
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .css-cvehem-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "#666666",
                    },
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        borderColor: "#666666",
                    },
                    // "&:hover:not(:focus)": {
                    //     label: {
                    //         color: "#fff",
                    //     },
                    // },
                    label: {
                        color: "#666666",
                    },
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
            paper: "#272727",
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
