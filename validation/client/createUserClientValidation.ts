import { z } from "zod";

export function createUserClientValidation(
    email: string,
    username: string,
    password: string,
    confirmPassword: string
) {
    const validationSchema = z
        .object({
            email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
            username: z
                .string()
                .min(2, {
                    message:
                        "Nazwa użytkownika musi zawierać co najmniej 2 znaki.",
                })
                .max(20, {
                    message:
                        "Nazwa użytkownika może zawierać maksymalnie 20 znaków.",
                })
                .regex(
                    new RegExp(
                        "^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                    ),
                    { message: "Nieprawidłowa nazwa użytkownika." }
                ),
            password: z
                .string()
                .min(8, {
                    message: "Hasło musi zawierać co najmniej 8 znaków.",
                })
                .regex(new RegExp(".*[A-Z].*"), {
                    message: "Hasło musi zawierać wielką literę.",
                })
                .regex(new RegExp(".*\\d.*"), {
                    message: "Hasło musi zawierać cyfrę.",
                })
                .regex(
                    new RegExp(
                        ".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"
                    ),
                    { message: "Hasło musi zawierać znak specjalny." }
                ),
            confirmPassword: z.string().min(1, { message: "Uzupełnij pole." }),
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
    const validationResult = validationSchema.safeParse({
        email,
        username,
        password,
        confirmPassword,
    });

    return validationResult;
}
