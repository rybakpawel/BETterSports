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

export default LabelSelectInput;
