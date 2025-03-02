"use client";

import React from "react";
import { Box, Button, FormHelperText } from "@mui/material";
import { MuiColorInput } from "mui-color-input";

interface IColorInputProps {
    label: string;
    inputId: string;
    inputName: string;
    inputValue: string;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    onChange: (color: string) => void;
}

const LabelColorInput: React.FC<IColorInputProps> = ({
    label,
    inputId,
    inputName,
    inputValue,
    isButton = false,
    buttonText = "",
    errorText,
    onChange,
}) => {
    return (
        <Box
            sx={{
                mb: 2,
                minWidth: "10rem",
            }}
        >
            <Box
                sx={{
                    display: {
                        xs: "block",
                        md: "flex",
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ mb: { xs: 1, md: 0 }, pr: 3, flexBasis: "25%" }}>
                    <label htmlFor={inputId}>{label}</label>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexBasis: "75%",
                    }}
                >
                    <MuiColorInput
                        format="hex"
                        value={inputValue}
                        onChange={onChange}
                        size="small"
                        isAlphaHidden={true}
                        sx={{
                            flexGrow: "1",
                        }}
                    />
                    {isButton && (
                        <Button
                            variant="outlined"
                            sx={{
                                ml: 2,
                                height: "40px",
                                flexShrink: 0,
                                maxWidth: "calc(100% - 8px)",
                            }}
                        >
                            {buttonText}
                        </Button>
                    )}
                </Box>
            </Box>
            {errorText && (
                <FormHelperText error sx={{ ml: "25%", minHeight: "20px" }}>
                    {errorText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default LabelColorInput;
