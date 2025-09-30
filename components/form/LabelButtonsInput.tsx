"use client";

import React from "react";
import { Box, Button, FormHelperText } from "@mui/material";

interface IButtonInputProps {
    label: string;
    inputId: string;
    value: string;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    buttons: Array<{
        value: string;
        label: string;
    }>;
    onChange: (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => void;
}

const LabelButtonsInput: React.FC<IButtonInputProps> = ({
    label,
    inputId,
    value,
    isButton = false,
    buttonText = "",
    errorText,
    buttons,
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
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "12px",
                        border: `1px solid ${theme.palette.grey[600]}`,
                        p: 0.5,
                        display: "flex",
                        gap: 1,
                        flexGrow: 1,
                        height: "48px",
                        alignItems: "center",
                    })}
                >
                    {buttons.map((button) => {
                        const isSelected = value === button.value;
                        return (
                            <Button
                                key={button.value}
                                variant={isSelected ? "contained" : "text"}
                                fullWidth
                                onClick={(event) =>
                                    onChange(event, button.value)
                                }
                                sx={(theme) => ({
                                    height: "40px",
                                    minHeight: "40px",
                                    color: isSelected
                                        ? theme.palette.primary.contrastText
                                        : theme.palette.text.secondary,
                                    backgroundColor: isSelected
                                        ? theme.palette.primary.main
                                        : "transparent",
                                    "&:hover": {
                                        color: isSelected
                                            ? theme.palette.primary.contrastText
                                            : theme.palette.text.primary,
                                        backgroundColor: isSelected
                                            ? theme.palette.primary.light
                                            : "transparent",
                                    },
                                })}
                            >
                                {button.label}
                            </Button>
                        );
                    })}
                </Box>
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

export default LabelButtonsInput;
