import { getUser } from "@/core/User";
import {
    settingsUserDataValidation,
    SettingsUserDataType,
} from "../common/settingsUserDataValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const settingsUserDataServerValidation = async (
    data: SettingsUserDataType,
    userId: number
) => {
    const result = settingsUserDataValidation.safeParse(data);

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
};
