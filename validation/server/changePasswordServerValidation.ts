import { getUser } from "@/core/User";
import {
    changePasswordValidation,
    ChangePasswordType,
} from "@/validation/common/changePasswordValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { compare } from "bcryptjs";

export const changePasswordServerValidation = async (
    data: ChangePasswordType,
    userId: number
) => {
    const result = changePasswordValidation.safeParse(data);

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

    if (!userId) {
        throw new LogicError("Brak identyfikatora użytkownika", 400);
    }

    const user = await getUser({ id: userId });

    if (!user) {
        throw new LogicError(
            "Użytkownik o podanym identyfikatorze nie istnieje",
            400
        );
    }

    if (user?.password) {
        const isOldPasswordMatch = await compare(
            data.oldPassword,
            user.password
        );

        if (!isOldPasswordMatch) {
            throw new LogicError("Stare hasło się nie zgadza", 400);
        }
    }
};
