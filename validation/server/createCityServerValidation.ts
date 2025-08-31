import {
    createCityValidation,
    CreateCityType,
} from "../common/createCityValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getCountry } from "@/core/Country";
import { checkExistingCityInCountry } from "@/core/City";
import { getUser } from "@/core/User";

export const createCityServerValidation = async (
    data: CreateCityType,
    userId: number
) => {
    const result = createCityValidation.safeParse(data);

    if (!result.success) {
        const validationErrors = result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));

        throw new LogicError(
            `Błąd walidacji: ${validationErrors
                .map((e) => `${e.path}: ${e.message}`)
                .join(", ")}`,
            400
        );
    }

    const country = await getCountry(data.country);

    if (!country) {
        throw new LogicError("Podany kraj nie istnieje", 400);
    }

    const existingCity = await checkExistingCityInCountry(
        data.name,
        data.country
    );

    if (existingCity) {
        throw new LogicError(
            "Miasto o takiej nazwie już istnieje w podanym kraju",
            400
        );
    }

    if (!userId) throw new LogicError("Brak identyfikatora użytkownika", 400);

    const user = await getUser({ id: userId });

    if (!user)
        throw new LogicError(
            "Użytkownik o podanym identyfikatorze nie istnieje",
            400
        );
};
