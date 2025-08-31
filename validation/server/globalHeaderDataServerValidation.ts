import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getUser } from "@/core/User";

export const globalHeaderDataServerValidation = async (userId: number) => {
    if (!userId)
        throw new LogicError(
            "Brak identyfikatora zalogowanego użytkownika",
            400
        );

    const user = await getUser({ id: userId }, { profileImage: true });

    if (!user)
        throw new LogicError(
            `Użytkownik o podanym identyfikatorze: ${userId} nie istnieje`,
            400
        );
};
