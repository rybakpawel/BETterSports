import { z } from "zod";

export const accountDataValidation = z.object({
    username: z
        .string()
        .max(20, {
            message: "Nazwa użytkownika może zawierać maksymalnie 20 znaków",
        })
        .regex(
            new RegExp(
                "^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
            ),
            { message: "Nieprawidłowa nazwa użytkownika" }
        )
        .or(z.literal(""))
        .optional(),

    favouriteSport: z
        .number()
        .int({ message: "ID sportu musi być liczbą całkowitą" })
        .positive({ message: "ID sportu musi być liczbą dodatnią" })
        .or(z.literal(0))
        .optional(),
    favouriteTeam: z
        .number()
        .int({ message: "ID drużyny musi być liczbą całkowitą" })
        .positive({ message: "ID drużyny musi być liczbą dodatnią" })
        .or(z.literal(0))
        .optional(),
    primaryColor: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i, { message: "Nieprawidłowy format koloru" })
        .or(z.literal(""))
        .optional(),
    secondaryColor: z
        .string()
        .regex(/^#[0-9A-F]{6}$/i, { message: "Nieprawidłowy format koloru" })
        .or(z.literal(""))
        .optional(),
});

export type AccountDataType = z.infer<typeof accountDataValidation>;
