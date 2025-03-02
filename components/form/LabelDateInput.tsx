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
    label: string;
    inputId: string;
    inputName: string;
    inputValue: Dayjs | null;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    onChange: (value: Dayjs | null) => void;
}

const LabelDateInput: React.FC<IDateInputProps> = ({
    label,
    inputId,
    inputName,
    inputValue,
    isButton = false,
    buttonText = "",
    errorText,
    onChange,
}) => {
    const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);

    const handleDatePickerFocus = () => {
        setIsDatePickerSelected(true);
    };

    const handleDatePickerBlur = () => {
        setIsDatePickerSelected(false);
    };
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
                    <LocalizationProvider
                        localeText={
                            plPL.components.MuiLocalizationProvider.defaultProps
                                .localeText
                        }
                        adapterLocale="pl"
                        dateAdapter={AdapterDayjs}
                    >
                        <DatePicker
                            value={inputValue}
                            format="DD-MM-YYYY"
                            maxDate={dayjs()}
                            onOpen={handleDatePickerFocus}
                            onClose={handleDatePickerBlur}
                            onChange={onChange}
                            slotProps={{
                                textField: {
                                    placeholder: "DD/MM/RRRR",
                                    size: "small",
                                    error: errorText !== "" ? true : false,
                                    helperText: errorText,
                                    onFocus: handleDatePickerFocus,
                                    onBlur: handleDatePickerBlur,
                                    sx: {
                                        flexGrow: 1,
                                    },
                                },
                                leftArrowIcon: {
                                    sx: {
                                        color: "#ffffff",
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                    },
                                },
                                rightArrowIcon: {
                                    sx: {
                                        color: "#ffffff",
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                    },
                                },
                                switchViewIcon: {
                                    sx: {
                                        color: "#ffffff",
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                    },
                                },
                                calendarHeader: {
                                    sx: {
                                        color: "#ffffff",
                                    },
                                },
                                day: {
                                    sx: {
                                        "&.MuiPickersDay-root.Mui-selected": {
                                            backgroundColor: "primary.main",
                                        },
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                        "&:focus": {
                                            color: "primary.contrastText",
                                            backgroundColor: "primary.main",
                                        },
                                    },
                                },

                                layout: {
                                    sx: {
                                        "& .MuiDayCalendar-weekDayLabel": {
                                            color: "rgba(255, 255, 255, 0.6)",
                                        },
                                        "& .MuiPickersDay-root": {
                                            "&.Mui-selected": {
                                                backgroundColor:
                                                    "rgba(255, 228, 0, 1)",
                                            },
                                        },
                                        ".MuiPickersYear-yearButton.Mui-selected":
                                            {
                                                color: "primary.contrastText",
                                                backgroundColor: "primary.main",
                                                transition: "all 0.5s ease",
                                            },
                                        ".MuiPickersYear-yearButton:hover": {
                                            color: "primary.main",
                                            transition: "all 0.5s ease",
                                        },
                                    },
                                },
                            }}
                        />
                    </LocalizationProvider>
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

export default LabelDateInput;
