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
    inputName: string;
    inputValue: string;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    isPassword?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LabelTextInput: React.FC<ITextInputProps> = ({
    label,
    inputId,
    inputName,
    inputValue,
    isButton = false,
    buttonText = "",
    errorText,
    isPassword = false,
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
                    <TextField
                        id={inputId}
                        name={inputName}
                        size="small"
                        type={isPassword && !showPassword ? "password" : "text"}
                        value={inputValue}
                        onChange={onChange}
                        error={!!errorText}
                        variant="outlined"
                        fullWidth
                        sx={{
                            flexGrow: 1,
                            "& .MuiInputBase-root": {
                                height: "40px",
                            },
                        }}
                        slotProps={{
                            input: {
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

export default LabelTextInput;
