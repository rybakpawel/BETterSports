import prisma from "@/prisma";
import { IUser } from "@/core/User";
import { createUserValidation } from "@/validation/common/createUserValidation";
import { LogicError } from "@/helpers/errorAndResponseHandlers";

export const createUserServerValidation = async (data: IUser) => {
    // TODO pomyśleć nad zmianą typu na CreateUserType
    const result = createUserValidation.safeParse(data);

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

    const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingEmail) {
        throw new LogicError(
            "Użytkownik z takim adresem e-mail już istnieje",
            400
        );
    }

    const existingUsername = await prisma.user.findUnique({
        where: { username: data.username },
    });

    if (existingUsername) {
        throw new LogicError("Podana nazwa użytkownika jest już zajęta", 400);
    }
};
