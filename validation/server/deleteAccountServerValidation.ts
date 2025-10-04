import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getUser } from "@/core/User";

export const deleteAccountServerValidation = async (userId: number) => {
    if (!userId) {
        throw new LogicError("Brak identyfikatora użytkownika", 400);
    }

    const userRecord = await getUser({ id: userId });

    if (!userRecord) {
        throw new LogicError(
            "Nie znaleziono użytkownika z podanym identyfikatorem",
            400
        );
    }
};
