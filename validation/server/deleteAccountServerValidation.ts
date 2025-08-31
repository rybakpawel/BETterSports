import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const deleteAccountServerValidation = async (userId: number) => {
    if (!userId) {
        throw new LogicError("Brak identyfikatora użytkownika", 400);
    }
};
