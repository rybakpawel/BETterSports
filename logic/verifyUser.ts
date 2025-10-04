import { getActivateToken } from "@/core/ActivateToken";
import { getSystemUser, updateUser } from "@/core/User";
import { updateActivateToken } from "@/core/ActivateToken";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { verifyUserServerValidation } from "@/validation/server/verifyUserServerValidation";
import prisma from "@/prisma";

const LOCATION = "app/logic/verifyUser";

export async function verifyUser(
    token: string
): Promise<ApiResponse<{ redirect: string }>> {
    const systemUser = await getSystemUser();

    try {
        await verifyUserServerValidation(token);

        const activateToken = await getActivateToken({ token });

        if (activateToken) {
            await prisma.$transaction(async (tx) => {
                await updateUser(
                    activateToken.userId,
                    {
                        isActive: true,
                        updatedAt: new Date(),
                        updatedBy: { connect: { id: activateToken.userId } },
                    },
                    tx
                );

                await updateActivateToken(
                    activateToken.id,
                    {
                        activatedAt: new Date(),
                        updatedAt: new Date(),
                        updatedBy: { connect: { id: activateToken.userId } },
                    },
                    tx
                );
            });
        }

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej weryfikacji konta użytkownika",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera", {
            redirect: `${process.env.NEXT_PUBLIC_URL}/sign-in?accountactivated=true`,
        });
    } catch (error) {
        if (error instanceof AppError) {
            if (error.message === "Token aktywacyjny wygasł") {
                await createLog({
                    level: LogLevel.WARN,
                    description: error.message,
                    location: LOCATION,
                    createdById: systemUser.id,
                    updatedById: systemUser.id,
                });

                return new ApiResponse(false, 500, "Wewnętrzny błąd serwera", {
                    redirect: `${process.env.NEXT_PUBLIC_URL}/sign-in?tokenexpired=true`,
                });
            }

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
                "Wewnętrzny błąd serwera podczas weryfikacji konta użytkownika: " +
                error,
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
