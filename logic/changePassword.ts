import { hash } from "bcryptjs";
import { IUserUpdate, updateUser } from "@/core/User";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { changePasswordServerValidation } from "@/validation/server/changePasswordServerValidation";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const LOCATION = "app/logic/changePassword";

export async function changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await changePasswordServerValidation(
            { oldPassword, newPassword, confirmPassword },
            userId
        );

        const hashedPassword = await hash(newPassword, 10);

        const user: Partial<IUserUpdate> = {
            password: hashedPassword,
            updatedAt: new Date(),
            updatedById: userId,
        };

        await updateUser(userId, user);

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej zmiany hasła do konta użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
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
                description: error.message,
                location: LOCATION,
                createdById: userId,
                updatedById: userId,
            });

            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            errorType: ErrorType.APP,
            description:
                "Wewnętrzny błąd serwera podczas zmiany hasła do konta użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
