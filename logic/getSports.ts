import { getAllSports } from "@/core/Sport";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import {
    AppError,
    CoreError,
    ApiResponse,
} from "@/helpers/errorAndResponseHandlers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LOCATION = "app/logic/getSports";

type Sport = {
    id: number;
    name: string;
};

export async function getSports(): Promise<ApiResponse<{ sports: Sport[] }>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        const sports = await getAllSports();

        const mappedData: Sport[] = sports.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej pobierania wszystkich sportów",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(true, 200, "Pobrano wszystkie sporty", {
            sports: mappedData,
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
                createdById: userId,
                updatedById: userId,
            });
            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            errorType: ErrorType.APP,
            description:
                "Wewnętrzny błąd serwera podczas pobierania wszystkich sportów: " +
                error,
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
