import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { getSystemUser } from "@/core/User";
import { verifyResetPasswordServerValidation } from "@/validation/server/verifyResetPasswordServerValidation";

const LOCATION = "app/logic/verifyResetPassword";

export async function verifyResetPassword(
    token: string
): Promise<ApiResponse<{ redirect: string }>> {
    const systemUser = await getSystemUser();

    try {
        await verifyResetPasswordServerValidation(token);

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej weryfikacji tokena resetowania hasła",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(
            true,
            200,
            "Token resetowania hasła jest prawidłowy",
            {
                redirect: `${process.env.NEXT_PUBLIC_URL}/reset-password/${token}`,
            }
        );
    } catch (error) {
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
                "Wewnętrzny błąd serwera podczas weryfikacji tokena resetowania hasła",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
