import { getUser } from "@/core/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { globalHeaderDataServerValidation } from "@/validation/server/globalHeaderDataServerValidation";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { Image } from "@prisma/client";

const LOCATION = "app/logic/getGlobalHeaderData";

export async function getGlobalHeaderData(): Promise<
    ApiResponse<{ profileImage: Image | null }>
> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await globalHeaderDataServerValidation(userId);

        const user = await getUser({ id: userId }, { profileImage: true });

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej pobierania informacji z górnej belki zalogowanego użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(
            true,
            200,
            "Pobrano informacje z górnej belki zalogowanego użytkownika",
            {
                profileImage: user?.profileImage ?? null,
                // później do obsłużenia przychodzące wiadomości
            }
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
                "Wewnętrzny błąd serwera podczas pobierania informacji z górnej belki zalogowanego użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
