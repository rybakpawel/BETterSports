import { z } from "zod";

export const createUserValidation = z
    .object({
        email: z
            .string({ required_error: "Brak adresu e-mail" })
            .min(1, { message: "Brak adresu e-mail" })
            .email({ message: "Nieprawidłowy adres e-mail" }),
        username: z
            .string({ required_error: "Brak nazwy użytkownika" })
            .min(1, { message: "Brak nazwy użytkownika" })
            .min(2, {
                message: "Nazwa użytkownika musi zawierać co najmniej 2 znaki",
            })
            .max(20, {
                message:
                    "Nazwa użytkownika może zawierać maksymalnie 20 znaków",
            })
            .regex(
                new RegExp(
                    "^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                ),
                { message: "Nieprawidłowa nazwa użytkownika" }
            ),
        password: z
            .string({ required_error: "Brak hasła" })
            .min(1, { message: "Brak hasła" })
            .min(8, { message: "Hasło musi zawierać co najmniej 8 znaków" })
            .regex(new RegExp(".*[A-Z].*"), {
                message: "Hasło musi zawierać wielką literę",
            })
            .regex(new RegExp(".*\\d.*"), {
                message: "Hasło musi zawierać cyfrę",
            })
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                { message: "Hasło musi zawierać znak specjalny" }
            ),
        confirmPassword: z
            .string({ required_error: "Brak potwierdzenia hasła" })
            .min(1, { message: "Brak potwierdzenia hasła" }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Hasła nie są takie same",
            });
        }
    });

export type CreateUserType = z.infer<typeof createUserValidation>;
