import { createUser, getSystemUser } from "@/core/User";
import { createUserPreferences } from "@/core/UserPreferences";
import { createUserServerValidation } from "@/validation/server/createUserServerValidation";
import { hash } from "bcryptjs";
import { createActivateToken } from "@/core/ActivateToken";
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
import { CreateUserType } from "@/validation/common/createUserValidation";
import prisma from "@/prisma";

const LOCATION = "app/logic/createNewUser";

export async function createNewUser(
    userData: CreateUserType
): Promise<ApiResponse<{ userId: number }>> {
    const systemUser = await getSystemUser();

    try {
        await createUserServerValidation(userData);

        const hashedPassword = await hash(userData.password, 10);
        const originalToken = uuidv4();

        const result = await prisma.$transaction(async (tx) => {
            const newUser = await createUser(
                {
                    email: userData.email,
                    username: userData.username,
                    password: hashedPassword,
                    person: {
                        create: {},
                    },
                    isActive: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                tx
            );

            await createUserPreferences(
                {
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                    createdAt: new Date(),
                    createdBy: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                    updatedAt: new Date(),
                    updatedBy: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                },
                tx
            );

            await createActivateToken(
                {
                    token: originalToken, // Przekazujemy oryginalny token, haszowanie w core
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    user: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                    createdAt: new Date(),
                    createdBy: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                    updatedAt: new Date(),
                    updatedBy: {
                        connect: {
                            id: newUser.id,
                        },
                    },
                },
                tx
            );

            return newUser;
        });

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // TODO do skonfigurowania gdy już będzie hosting
            to: [userData.email],
            subject: "Weryfikacja konta BETter",
            react: VerifyUser({
                activateToken: originalToken, // Wysyłamy oryginalny token, nie zhashowany
            }) as React.ReactElement,
        });

        if (error) {
            throw new CoreError(
                `Błąd podczas wysyłania e-maila weryfikacyjnego`
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
            userId: result.id,
        });
    } catch (error) {
        if (error instanceof AppError) {
            await createLog({
                level: LogLevel.ERROR,
                errorType: error.errorType,
                description:
                    error.message +
                    (error.messageLog ? ": " + error.messageLog : ""),
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
                "Wewnętrzny błąd serwera podczas tworzenia użytkownika: " +
                error,
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
