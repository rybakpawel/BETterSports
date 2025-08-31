import { z } from "zod";

export const loginUserValidation = z.object({
    email: z
        .string({ required_error: "Brak adresu e-mail" })
        .min(1, { message: "Brak adresu e-mail" })
        .email({ message: "Nieprawidłowy adres e-mail" }),
    password: z
        .string({ required_error: "Brak hasła" })
        .min(1, { message: "Brak hasła" }),
});

export type LoginUserType = z.infer<typeof loginUserValidation>;
