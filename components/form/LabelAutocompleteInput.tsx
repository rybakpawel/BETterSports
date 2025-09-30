"use client";

import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    FormHelperText,
    TextField,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";

interface IDataItem {
    id: number;
    name: string;
}

interface IAutocompleteInputProps {
    label: string;
    inputId: string;
    inputValue: string;
    defaultId: number;
    isButton?: boolean;
    buttonText?: string;
    dataList: Array<IDataItem>;
    isLoadingData: boolean;
    errorText?: string;
    onChange: (
        event: React.SyntheticEvent,
        value: IDataItem | null,
        reason: string
    ) => void;
    onInputChange: (
        event: React.SyntheticEvent,
        newInputValue: string,
        reason: string
    ) => void;
    onButtonClick?: () => void;
}

const LabelAutocompleteInput: React.FC<IAutocompleteInputProps> = ({
    label,
    inputId,
    inputValue,
    defaultId,
    isButton = false,
    buttonText = "",
    dataList,
    isLoadingData,
    errorText,
    onChange,
    onInputChange,
    onButtonClick,
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
            <Autocomplete
                disablePortal
                id="city"
                size="small"
                options={dataList}
                loading={isLoadingData}
                loadingText="Wczytuję..."
                noOptionsText={
                    <Box>
                        <ListItem
                            sx={(theme) => ({
                                p: 2,
                                color: theme.palette.text.secondary,
                                borderTop: "none",
                            })}
                        >
                            <ListItemText primary="Brak pasujących wyników" />
                        </ListItem>
                        {isButton && (
                            <ListItem
                                sx={(theme) => ({
                                    borderTop: `1px solid ${theme.palette.grey[600]}`,
                                    padding: 0,
                                })}
                            >
                                <ListItemButton onClick={onButtonClick}>
                                    <ListItemText primary={buttonText} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </Box>
                }
                inputValue={inputValue}
                value={{ id: defaultId, name: inputValue }}
                onChange={onChange}
                onInputChange={onInputChange}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                isOptionEqualToValue={(option, value) => option.id !== value.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                height: "48px",
                            },
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <ListItem {...props} key={option.id}>
                        <ListItemText primary={option.name} />
                    </ListItem>
                )}
                slotProps={{
                    listbox: {
                        sx: {
                            paddingBottom: isButton ? "0" : "8px",
                        },
                    },
                    popper: {
                        sx: {
                            "& .MuiAutocomplete-listbox": {
                                paddingBottom: isButton ? "0" : "8px",
                            },
                        },
                    },
                }}
                clearOnBlur={true}
                {...(isButton && {
                    ListboxComponent: ({ children, ...other }) => (
                        <Box {...other}>
                            {children}
                            {isButton && (
                                <ListItem
                                    sx={(theme) => ({
                                        borderTop: `1px solid ${theme.palette.grey[600]}`,
                                        padding: 0,
                                    })}
                                >
                                    <ListItemButton onClick={onButtonClick}>
                                        <ListItemText primary={buttonText} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </Box>
                    ),
                })}
            />
            {errorText && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                    {errorText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default LabelAutocompleteInput;
