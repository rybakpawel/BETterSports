import { validateExistingUser } from "@/core/User";

// 1. Do dostosowania w momencie jak wejdzie Joi
// 2. Do umieszczenia w osobnym pliku do eksportowania we wszystkich walidacjach
interface IErrorObject {
    status: number;
    message: string;
    context: string;
}

export async function createUserServerValidation(
    email: string,
    username: string
): Promise<IErrorObject | undefined> {
    const existingUser = await validateExistingUser(email, username);

    if (existingUser) {
        const error: IErrorObject = {
            status: 409,
            message:
                "Podany e-mail lub nazwa użytkownika istnieje już w serwisie.",
            context: "conflict",
        };
        return error;
    }
}
