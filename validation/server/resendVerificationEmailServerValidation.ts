import { getUser } from "@/core/User";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getActivateToken } from "@/core/ActivateToken";

export const resendVerificationEmailServerValidation = async (
    userId: number
) => {
    if (!userId) throw new LogicError("Brak identyfikatora użytkownika", 400);

    const user = await getUser({ id: userId });
    if (!user)
        throw new LogicError("Brak użytkownika o podanym identyfikatorze", 400);

    const token = await getActivateToken({ userId });
    if (!token)
        throw new LogicError(
            "Brak tokenu dla użytkownika o podanym identyfikatorze",
            400
        );
};
