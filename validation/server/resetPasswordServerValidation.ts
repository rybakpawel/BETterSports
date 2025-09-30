import { getUser } from "@/core/User";
import {
    resetPasswordValidation,
    ResetPasswordType,
} from "@/validation/common/resetPasswordValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { getResetPasswordToken } from "@/core/ResetPasswordToken";
import { compare } from "bcryptjs";

export const resetPasswordServerValidation = async (
    data: ResetPasswordType,
    oldPassword: string,
    userId: number,
    token: string
) => {
    const result = resetPasswordValidation.safeParse(data);

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

    if (!userId && !token)
        throw new LogicError("Brak identyfikatora użytkownika lub tokena", 400);

    if (userId) {
        if (!oldPassword) throw new LogicError("Brak starego hasła", 400);

        const user = await getUser({ id: Number(userId) });

        if (!user)
            throw new LogicError(
                "Użytkownik o podanym identyfikatorze nie istnieje",
                400
            );

        if (user?.password) {
            const isOldPasswordMatch = await compare(
                oldPassword,
                user.password
            );

            if (!isOldPasswordMatch) {
                throw new LogicError("Stare hasło się nie zgadza", 400);
            }
        }
    } else if (token) {
        const resetPasswordToken = await getResetPasswordToken({ token });

        if (!resetPasswordToken)
            throw new LogicError("Podany token nie istnieje", 400);
    }
};
