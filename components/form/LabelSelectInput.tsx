"use client";

import React from "react";
import {
    Box,
    Button,
    FormHelperText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";

interface IDataItem {
    id: string | number | bigint;
    name: string;
}

interface ISelectInputProps {
    label: string;
    inputId: string;
    value: string;
    isButton?: boolean;
    buttonText?: string;
    errorText?: string;
    dataList: Array<IDataItem>;
    onChange: (event: SelectChangeEvent) => void;
}

const LabelSelectInput: React.FC<ISelectInputProps> = ({
    label,
    inputId,
    value,
    isButton = false,
    buttonText = "",
    errorText,
    dataList,
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
                    <Select
                        id={inputId}
                        size="small"
                        value={value.toString()}
                        onChange={onChange}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                        }}
                        sx={{
                            flexGrow: "1",
                        }}
                    >
                        {!dataList ? (
                            <MenuItem value={0}>Wczytuję..</MenuItem>
                        ) : (
                            dataList?.map((item) => {
                                return (
                                    <MenuItem
                                        key={item.id.toString()}
                                        value={item.id.toString()}
                                    >
                                        {item.name}
                                    </MenuItem>
                                );
                            })
                        )}
                    </Select>
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

export default LabelSelectInput;
