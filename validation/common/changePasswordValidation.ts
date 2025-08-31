import { z } from "zod";

export const changePasswordValidation = z
    .object({
        oldPassword: z
            .string({ required_error: "Brak starego hasła" })
            .min(1, { message: "Brak starego hasła" }),
        newPassword: z
            .string({ required_error: "Brak nowego hasła" })
            .min(1, { message: "Brak nowego hasła" })
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
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
        if (confirmPassword !== newPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Hasła nie są takie same.",
            });
        }
    });

export type ChangePasswordType = z.infer<typeof changePasswordValidation>;
