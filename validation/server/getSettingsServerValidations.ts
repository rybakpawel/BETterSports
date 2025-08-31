import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const getSettingsServerValidation = async (userId: number) => {
    if (!userId)
        throw new LogicError(
            "Brak identyfikatora zalogowanego użytkownika",
            400
        );
};
