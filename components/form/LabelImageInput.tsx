"use client";

import React, { useState } from "react";
import {
    Box,
    FormHelperText,
    Button,
    Typography,
    useTheme,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface IImageInputProps {
    label: string;
    inputId: string;
    imageSrc: string;
    imageAlt: string;
    errorText?: string;
    imageHeight?: string;
    imageWidth?: string;
    borderRadius?: string;
    onFileChange: (file: File, inputId: string) => void;
    isProfilePicture?: boolean;
}

const LabelImageInput: React.FC<IImageInputProps> = ({
    label,
    inputId,
    imageSrc,
    imageAlt,
    errorText,
    imageHeight = "200px",
    imageWidth = "200px",
    borderRadius = "",
    onFileChange,
    isProfilePicture = false,
}) => {
    const theme = useTheme();
    const [currentImage, setCurrentImage] = useState<string>(imageSrc);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setCurrentImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
            onFileChange(file, inputId);
        }
    };

    return (
        <Box sx={{ mb: 1.5 }}>
            <Typography
                variant="body2"
                sx={{
                    color: theme.palette.text.primary,
                    fontSize: 14,
                    fontWeight: 500,
                    mb: 1,
                }}
            >
                {label}
            </Typography>

            {isProfilePicture ? (
                // Profile Picture Layout
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        component="img"
                        alt={imageAlt}
                        src={currentImage}
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUpload />}
                    >
                        Dodaj nowe
                        <input
                            id={inputId}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
            ) : (
                // Cover Photo Layout
                <Box
                    sx={{
                        height: 80,
                        width: "100%",
                        backgroundColor: theme.palette.background.default,
                        border: `1px solid ${theme.palette.grey[500]}`,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                            borderColor: theme.palette.grey[500],
                        },
                    }}
                >
                    {currentImage &&
                    currentImage !==
                        "https://www.amnesty.ie/wp-content/uploads/2016/05/placeholder_2.jpg" ? (
                        <Box
                            component="img"
                            alt={imageAlt}
                            src={currentImage}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    ) : null}

                    <Button
                        component="label"
                        sx={{
                            position: "absolute",
                            color: theme.palette.text.secondary,
                            "&:hover": {
                                color: theme.palette.text.primary,
                                backgroundColor: "transparent",
                            },
                            minWidth: "auto",
                            p: 1,
                        }}
                    >
                        <CloudUpload sx={{ fontSize: 24 }} />
                        <input
                            id={inputId}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            hidden
                            onChange={handleFileChange}
                        />
                    </Button>
                </Box>
            )}

            {errorText && (
                <FormHelperText error sx={{ mt: 0.5 }}>
                    {errorText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default LabelImageInput;
