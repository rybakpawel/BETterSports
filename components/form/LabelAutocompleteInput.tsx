"use client";

import React from "react";
import {
    Autocomplete,
    Box,
    Button,
    FormHelperText,
    TextField,
} from "@mui/material";

interface IDataItem {
    id: number;
    name: string;
}

interface IAutocompleteInputProps {
    label: string;
    inputId: string;
    inputName: string;
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
    inputName,
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
                    <Autocomplete
                        disablePortal
                        id="city"
                        size="small"
                        options={dataList}
                        loading={isLoadingData}
                        loadingText="Wczytuję..."
                        noOptionsText="Brak pasujących wyników."
                        inputValue={inputValue}
                        value={{ id: defaultId, name: inputValue }}
                        onChange={onChange}
                        onInputChange={onInputChange}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => option.id}
                        isOptionEqualToValue={(option, value) =>
                            option.id !== value.id
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                        )}
                        clearOnBlur={true}
                        sx={{
                            flexGrow: 1,
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
                            onClick={onButtonClick}
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

export default LabelAutocompleteInput;
