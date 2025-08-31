import { z } from "zod";

export const resetPasswordValidation = z
    .object({
        password: z
            .string({ required_error: "Brak hasła" })
            .min(1, { message: "Brak hasła" })
            .min(8, {
                message: "Hasło musi zawierać co najmniej 8 znaków",
            })
            .regex(new RegExp(".*[A-Z].*"), {
                message: "Hasło musi zawierać wielką literę",
            })
            .regex(new RegExp(".*\\d.*"), {
                message: "Hasło musi zawierać cyfrę",
            })
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                {
                    message: "Hasło musi zawierać znak specjalny",
                }
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
                message: "Hasła nie są takie same.",
            });
        }
    });

export type ResetPasswordType = z.infer<typeof resetPasswordValidation>;
