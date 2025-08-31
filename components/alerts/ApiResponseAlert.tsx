"use client";

import { useEffect } from "react";
import { Snackbar, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type ApiResponse<T = any> = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
};

interface ApiResponseAlertProps {
    open: boolean;
    onClose: () => void;
    response: ApiResponse | null;
    autoHideDuration?: number;
}

export default function ApiResponseAlert({
    open,
    onClose,
    response,
    autoHideDuration = 5000,
}: ApiResponseAlertProps) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, autoHideDuration);
            return () => clearTimeout(timer);
        }
    }, [open, autoHideDuration, onClose]);

    if (!response) return null;

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Collapse in={open}>
                <Alert
                    severity={response.success ? "success" : "error"}
                    variant="filled"
                    sx={{
                        width: "100%",
                        fontWeight: 500,
                        alignItems: "center",
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {response.message}
                </Alert>
            </Collapse>
        </Snackbar>
    );
}
