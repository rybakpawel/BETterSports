import {
    accountDataValidation,
    AccountDataType,
} from "../common/accountDataValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getUser } from "@/core/User";
import { getSportById } from "@/core/Sport";
import { getTeamById } from "@/core/Team";

export const accountDataServerValidation = async (
    data: AccountDataType,
    userId: number
) => {
    const result = accountDataValidation.safeParse(data);

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

    if (!userId) throw new LogicError("Brak identyfikatora użytkownika", 400);

    const user = await getUser({ id: userId });

    if (!user)
        throw new LogicError(
            "Użytkownik o podanym identyfikatorze nie istnieje",
            400
        );

    if (data.username && data.username.trim() !== "") {
        const existingUsername = await getUser({ username: data.username });

        if (existingUsername && existingUsername.id !== userId) {
            throw new LogicError(
                "Podana nazwa użytkownika jest już zajęta",
                400
            );
        }
    }

    if (data.favouriteSport && data.favouriteSport > 0) {
        const sport = await getSportById(data.favouriteSport);

        if (!sport) {
            throw new LogicError("Podany sport nie istnieje", 400);
        }
    }

    if (data.favouriteTeam && data.favouriteTeam > 0) {
        const team = await getTeamById(data.favouriteTeam);

        if (!team) {
            throw new LogicError("Podana drużyna nie istnieje", 400);
        }
    }
};
