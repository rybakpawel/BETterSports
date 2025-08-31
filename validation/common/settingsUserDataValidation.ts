import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

export const settingsUserDataValidation = z.object({
    name: z
        .string()
        .max(30, { message: "Imię może zawierać maksymalnie 30 znaków." })
        .optional()
        .refine(
            (value) => !value || /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value),
            {
                message: "Imię może zawierać tylko litery",
            }
        ),

    lastName: z
        .string()
        .max(30, {
            message: "Nazwisko może zawierać maksymalnie 30 znaków.",
        })
        .optional()
        .refine(
            (value) => !value || /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value),
            {
                message: "Nazwisko może zawierać tylko litery",
            }
        ),

    birthDate: z
        .custom<Dayjs | null | undefined>(
            (value) => {
                return (
                    value === undefined ||
                    value === null ||
                    dayjs.isDayjs(value)
                );
            },
            {
                message: "Nieprawidłowy format daty",
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
                message: "Data urodzenia nie może być z przyszłości",
            }
        ),

    gender: z.string().optional(),
    nationality: z.number().optional(),
    city: z.number().optional(),
});

export type SettingsUserDataType = z.infer<typeof settingsUserDataValidation>;
