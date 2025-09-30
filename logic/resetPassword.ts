import { getResetPasswordToken } from "@/core/ResetPasswordToken";
import { hash } from "bcryptjs";
import { getSystemUser, updateUser } from "@/core/User";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { resetPasswordServerValidation } from "@/validation/server/resetPasswordServerValidation";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";

const LOCATION = "app/logic/resetPassword";

export async function resetPassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
    userId: number,
    token: string
): Promise<ApiResponse<void>> {
    const systemUser = await getSystemUser();

    try {
        await resetPasswordServerValidation(
            { password: newPassword, confirmPassword },
            oldPassword,
            userId,
            token
        );

        if (token) {
            const resetPasswordToken = await getResetPasswordToken({ token });
            userId = resetPasswordToken?.userId ?? 0;
        }

        const hashedPassword = await hash(newPassword, 10);

        const user = {
            password: hashedPassword,
            updatedAt: new Date(),
            updatedBy: { connect: { id: userId } },
        };

        await updateUser(userId, user);

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej ustawienia nowego hasła do konta użytkownika",
            location: LOCATION,
            createdById: !userId ? systemUser?.id : userId,
            updatedById: !userId ? systemUser?.id : userId,
        });

        return new ApiResponse(
            true,
            200,
            "Hasło użytkownika zostało zmienione"
        );
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
                "Wewnętrzny błąd serwera podczas ustawienia nowego hasła do konta użytkownika: " +
                error,
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
