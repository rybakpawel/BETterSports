"use client";

import React from "react";
import {
    Box,
    Button,
    FormHelperText,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

interface IButtonInputProps {
    label: string;
    inputId: string;
    inputName: string;
    inputValue: string;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    buttons: Array<{
        value: string;
        label: string;
    }>;
    onChange: (event: React.MouseEvent<HTMLElement>, newValue: string) => void;
}

const LabelButtonsInput: React.FC<IButtonInputProps> = ({
    label,
    inputId,
    inputName,
    inputValue,
    isButton = false,
    buttonText = "",
    errorText,
    buttons,
    onChange,
}) => {
    const buttonFlexBasis = `${100 / buttons.length}%`;
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
                    <ToggleButtonGroup
                        color="primary"
                        value={inputValue}
                        onChange={onChange}
                        exclusive
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                        }}
                    >
                        {buttons.map((button) => {
                            return (
                                <ToggleButton
                                    key={button.value}
                                    value={button.value}
                                    size="small"
                                    sx={{
                                        flexBasis: buttonFlexBasis,
                                    }}
                                >
                                    {button.label}
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
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

export default LabelButtonsInput;
