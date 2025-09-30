"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ITextInputProps {
    label: string;
    inputId: string;
    errorText?: string;
    isButton?: boolean;
    buttonText?: string;
    isPassword?: boolean;
    textFieldProps?: React.ComponentProps<typeof TextField>;
    children?: React.ReactNode;
}

const LabelTextInput: React.FC<ITextInputProps> = ({
    label,
    inputId,
    errorText,
    isButton = false,
    buttonText = "",
    isPassword = false,
    textFieldProps = {},
    children,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
                <TextField
                    id={inputId}
                    type={isPassword && !showPassword ? "password" : "text"}
                    error={!!errorText}
                    variant="outlined"
                    fullWidth
                    {...textFieldProps}
                    slotProps={{
                        input: {
                            ...textFieldProps?.slotProps?.input,
                            endAdornment: isPassword ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        },
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
            {children}
        </Box>
    );
};

export default LabelTextInput;
