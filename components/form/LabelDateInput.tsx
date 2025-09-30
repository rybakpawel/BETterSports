"use client";

import React, { useState } from "react";
import { Box, Button, FormHelperText } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { plPL } from "@mui/x-date-pickers/locales";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pl";
import dayjs, { Dayjs } from "dayjs";

interface IDateInputProps {
    inputId: string;
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
    errorText?: string;
    isButton?: boolean;
    buttonText?: string;
}

const LabelDateInput: React.FC<IDateInputProps> = ({
    inputId,
    label,
    value,
    onChange,
    errorText,
    isButton = false,
    buttonText = "",
}) => {
    const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);

    const handleDatePickerFocus = () => {
        setIsDatePickerSelected(true);
    };

    const handleDatePickerBlur = () => {
        setIsDatePickerSelected(false);
    };
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
                <LocalizationProvider
                    localeText={
                        plPL.components.MuiLocalizationProvider.defaultProps
                            .localeText
                    }
                    adapterLocale="pl"
                    dateAdapter={AdapterDayjs}
                >
                    <DatePicker
                        value={value}
                        format="DD-MM-YYYY"
                        maxDate={dayjs()}
                        onOpen={handleDatePickerFocus}
                        onClose={handleDatePickerBlur}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                placeholder: "DD/MM/RRRR",
                                size: "small",
                                error: !!errorText,
                                helperText: errorText,
                                onFocus: handleDatePickerFocus,
                                onBlur: handleDatePickerBlur,
                                sx: {
                                    flexGrow: 1,
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
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

export default LabelDateInput;
