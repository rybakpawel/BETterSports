import { z } from "zod";

export const forgotPasswordValidation = z.object({
    email: z
        .string({ required_error: "Brak adresu e-mail" })
        .min(1, { message: "Brak adresu e-mail" })
        .email({ message: "Nieprawidłowy adres e-mail" }),
});

export type ForgotPasswordType = z.infer<typeof forgotPasswordValidation>;
