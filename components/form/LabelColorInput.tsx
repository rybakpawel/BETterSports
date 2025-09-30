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
        <Box sx={{ mb: 1.5 }}>
            <Box sx={{ mb: 1 }}>
                <Box
                    component="label"
                    htmlFor={inputId}
                    sx={(theme) => ({
                        color: theme.palette.text.primary,
                        fontSize: 14,
                        fontWeight: 500,
                    })}
                >
                    {label}
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                            height: "48px",
                            flexShrink: 0,
                        }}
                    >
                        {buttonText}
                    </Button>
                )}
            </Box>
            {errorText && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                    {errorText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default LabelColorInput;
