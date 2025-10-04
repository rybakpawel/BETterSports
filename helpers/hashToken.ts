import { createHash } from "crypto";

export const hashToken = (token: string): string => {
    return createHash("sha256").update(token).digest("hex");
};

export const hashTokenAsync = async (token: string): Promise<string> => {
    return new Promise((resolve) => {
        const hashedToken = hashToken(token);
        resolve(hashedToken);
    });
};
