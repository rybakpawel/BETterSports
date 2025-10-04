import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getActivateToken } from "@/core/ActivateToken";

export const verifyUserServerValidation = async (token: string) => {
    if (!token)
        throw new LogicError(
            "Brak tokena uprawniającego do aktywacji konta",
            400
        );

    const activateToken = await getActivateToken({ token });

    if (!activateToken) throw new LogicError("Podany token nie istnieje", 400);

    if (activateToken.activatedAt)
        throw new LogicError("Token aktywacyjny został już użyty", 401);

    if (new Date() > activateToken.expiresAt) {
        throw new LogicError("Token aktywacyjny wygasł", 401);
    }

    if (!activateToken.user.email || !activateToken.user.username) {
        throw new LogicError(
            "Konto zostało usunięte i nie może być aktywowane",
            403
        );
    }
};
