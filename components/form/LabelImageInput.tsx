"use client";

import React, { useState } from "react";
import { Box, FormHelperText } from "@mui/material";

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
}) => {
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
        // ! Do dodania placeholder w przypadku braku zdjęcia
        <Box
            sx={{
                mb: 2,
                minWidth: {
                    xs: "5rem",
                    md: "10rem",
                },
            }}
        >
            <label htmlFor={inputId}>{label}</label>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                }}
            >
                <Box
                    component="label"
                    htmlFor={inputId}
                    sx={{
                        cursor: "pointer",
                        display: "block",
                        height: imageHeight,
                        width: imageWidth,
                        borderRadius,
                        overflow: "hidden",
                        position: "relative",
                        "&:hover::after": {
                            content: '"Kliknij, aby zmienić"',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            borderRadius,
                            opacity: 1,
                            transition: "opacity 0.3s ease",
                        },
                        "&::after": {
                            content: '""',
                            opacity: 0,
                        },
                    }}
                >
                    <Box
                        component="img"
                        alt={imageAlt}
                        src={currentImage}
                        sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </Box>
                <input
                    id={inputId}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleFileChange}
                />
            </Box>
            {errorText && (
                <FormHelperText
                    error
                    sx={{ textAlign: "center", minHeight: "20px" }}
                >
                    {errorText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default LabelImageInput;
