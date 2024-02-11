import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "BETter Sports",
    description: "Social media application for groundhoppers",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pl">
            <body>{children}</body>
        </html>
    );
}
