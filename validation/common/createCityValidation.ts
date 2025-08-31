import { z } from "zod";

export const createCityValidation = z.object({
    country: z
        .number({ required_error: "Brak kraju, w którym leży miasto" })
        .int({ message: "ID kraju musi być liczbą całkowitą" })
        .positive({ message: "ID kraju musi być liczbą dodatnią" }),
    name: z
        .string({ required_error: "Brak nazwy miasta" })
        .min(1, { message: "Brak nazwy miasta" })
        .min(2, {
            message: "Nazwa miasta musi zawierać co najmniej 2 znaki",
        })
        .max(20, {
            message: "Nazwa miasta może zawierać maksymalnie 20 znaków",
        })
        .regex(new RegExp("^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\\s]+$"), {
            message: "Nieprawidłowa nazwa miasta",
        }),
});

export type CreateCityType = z.infer<typeof createCityValidation>;
