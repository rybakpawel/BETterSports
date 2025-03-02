import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export function settingsUserDataClientValidation(
    name: string,
    lastName: string,
    birthDate: Dayjs | null,
    city: string
) {
    const validationSchema = z.object({
        name: z
            .string()
            .max(30, { message: "Imię może zawierać maksymalnie 30 znaków." })
            .optional()
            .refine((value) => !value || /^\p{L}+$/u.test(value), {
                message: "Imię może zawierać tylko litery.",
            }),

        lastName: z
            .string()
            .max(30, {
                message: "Nazwisko może zawierać maksymalnie 30 znaków.",
            })
            .optional()
            .refine((value) => !value || /^\p{L}+$/u.test(value), {
                message: "Nazwisko może zawierać tylko litery.",
            }),
        birthDate: z
            .custom<Dayjs | undefined>(
                (value) => {
                    return (
                        value === undefined ||
                        value === null ||
                        dayjs.isDayjs(value)
                    );
                },
                {
                    message: "Expected a dayjs object or empty value",
                }
            )
            .optional()
            .refine(
                (date) => {
                    if (date === undefined || date === null) {
                        return true; // Jeśli data jest opcjonalna i nie jest podana, walidacja przechodzi
                    }
                    const today = dayjs().startOf("day");
                    return date.isBefore(today) || date.isSame(today);
                },
                {
                    message: "Data urodzenia nie może być z przyszłości.",
                }
            ),
        city: z
            .string()
            .max(50, {
                message: "Nazwa miasta może zawierać maksymalnie 50 znaków.",
            })
            .optional()
            .refine((value) => !value || /^\p{L}+$/u.test(value), {
                message: "Nazwa miasta może zawierać tylko litery.",
            }),
    });

    const validationResult = validationSchema.safeParse({
        name,
        lastName,
        birthDate,
        city,
    });

    return validationResult;
}
