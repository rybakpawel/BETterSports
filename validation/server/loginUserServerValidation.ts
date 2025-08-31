import { getUser } from "@/core/User";
import {
    loginUserValidation,
    LoginUserType,
} from "../common/loginUserValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";
import { compare } from "bcryptjs";

export const loginUserServerValidation = async (data: LoginUserType) => {
    const result = loginUserValidation.safeParse(data);

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

    const userRecord = await getUser({ email: data.email });

    if (!userRecord) {
        throw new LogicError(
            "Nie znaleziono użytkownika z podanym adresem e-mail",
            400
        );
    }

    if (!userRecord.isActive) {
        throw new LogicError("Użytkownik nie jest aktywny", 400);
    }

    const hashedPassword = userRecord?.password as string;

    const correctPassword = await new Promise((resolve, reject) => {
        compare(data.password, hashedPassword, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

    if (!correctPassword) {
        throw new LogicError("Nieprawidłowe hasło użytkownika.", 400);
    }
};
