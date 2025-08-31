import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getActivateToken } from "@/core/ActivateToken";

export const verifyUserServerValidation = async (token: string) => {
    if (!token)
        throw new LogicError(
            "Brak tokena uprawniającego do aktywacji konta",
            400
        );

    const activateToken = await getActivateToken({ token });

    if (!activateToken?.record)
        throw new LogicError("Podany token nie istnieje", 400);

    if (activateToken.record.activatedAt)
        throw new LogicError("Token aktywacyjny wygasł", 401);
};
