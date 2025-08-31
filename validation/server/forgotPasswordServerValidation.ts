import { getUser } from "@/core/User";
import {
    forgotPasswordValidation,
    ForgotPasswordType,
} from "@/validation/common/forgotPasswordValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const forgotPasswordServerValidation = async (
    data: ForgotPasswordType
) => {
    const result = forgotPasswordValidation.safeParse(data);

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

    const { email } = data;

    const userRecord = await getUser({ email });

    if (!userRecord) {
        throw new LogicError(
            "Nie znaleziono użytkownika z podanym adresem e-mail",
            400
        );
    }
};
