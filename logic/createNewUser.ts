import { IUser, createUser, getSystemUser } from "@/core/User";
import { createUserServerValidation } from "@/validation/server/createUserServerValidation";
import { hash } from "bcryptjs";
import { IActivateToken, createActivateToken } from "@/core/ActivateToken";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { VerifyUser } from "@/components/emailTemplates/vefifyUser";
import {
    AppError,
    CoreError,
    ApiResponse,
} from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";

const LOCATION = "app/logic/createNewUser";

export async function createNewUser(
    userData: IUser
): Promise<ApiResponse<{ userId: number }>> {
    try {
        await createUserServerValidation(userData);

        const { email, username, password } = userData;

        const hashedPassword = await hash(password, 10);

        const user: Partial<IUser> = {
            email,
            username,
            password: hashedPassword,
            person: {
                create: {},
            },
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const newUser = await createUser(user);

        const activateToken: Partial<IActivateToken> = {
            token: uuidv4(),
            user: {
                connect: {
                    id: newUser.record.id as number,
                },
            },
            createdAt: new Date(),
            createdBy: {
                connect: {
                    id: newUser.record.id as number,
                },
            },
            updatedAt: new Date(),
            updatedBy: {
                connect: {
                    id: newUser.record.id as number,
                },
            },
        };

        const newToken = await createActivateToken(activateToken);

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // TODO do skonfigurowania gdy już będzie hosting
            to: [newUser?.record.email as string],
            subject: "Weryfikacja konta BETter",
            react: VerifyUser({
                activateToken: newToken?.record.token,
            }) as React.ReactElement,
        });

        const systemUser = await getSystemUser();

        if (error) {
            throw new CoreError(
                "Błąd podczas wysyłania e-maila weryfikacyjnego."
            );
        }

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej tworzenia użytkownika",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(true, 200, "Nowy użytkownik został utworzony", {
            userId: newUser.record.id,
        });
    } catch (error) {
        const systemUser = await getSystemUser();

        if (error instanceof AppError) {
            await createLog({
                level: LogLevel.ERROR,
                errorType: error.errorType,
                description: error.message,
                location: LOCATION,
                createdById: systemUser.id,
                updatedById: systemUser.id,
            });

            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            errorType: ErrorType.APP,
            description:
                "Wewnętrzny błąd serwera podczas tworzenia użytkownika",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
