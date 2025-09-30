import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getResetPasswordToken } from "@/core/ResetPasswordToken";

export const verifyResetPasswordServerValidation = async (token: string) => {
    if (!token)
        throw new LogicError("Brak tokena uprawniającego do zmiany hasła", 400);

    const resetPasswordToken = await getResetPasswordToken({ token });

    if (!resetPasswordToken)
        throw new LogicError("Podany token nie istnieje", 400);
};
