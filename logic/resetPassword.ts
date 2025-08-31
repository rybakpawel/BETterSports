import { getResetPasswordToken } from "@/core/ResetPasswordToken";
import { hash } from "bcryptjs";
import { IUserUpdate, getSystemUser, updateUser } from "@/core/User";
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
    try {
        await resetPasswordServerValidation(
            { password: newPassword, confirmPassword },
            oldPassword,
            userId,
            token
        );

        if (token) {
            const resetPasswordToken = await getResetPasswordToken({ token });
            userId = resetPasswordToken?.record?.userId ?? 0;
        }

        const hashedPassword = await hash(newPassword, 10);

        const user: Partial<IUserUpdate> = {
            password: hashedPassword,
            updatedAt: new Date(),
            updatedById: userId,
        };

        await updateUser(userId, user);

        let systemUser;
        if (!userId) systemUser = await getSystemUser();

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej ustawienia nowego hasła do konta użytkownika",
            location: LOCATION,
            createdById: !systemUser ? userId : systemUser.id,
            updatedById: !systemUser ? userId : systemUser.id,
        });

        return new ApiResponse(
            true,
            200,
            "Hasło użytkownika zostało zmienione"
        );
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
                "Wewnętrzny błąd serwera podczas ustawienia nowego hasła do konta użytkownika",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
