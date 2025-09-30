import { getTeamsByInput } from "@/core/Team";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTeamsByInputServerValidation } from "@/validation/server/getTeamsByInputServerValidation";

const LOCATION = "app/logic/getTeamsByFormInput";

type Team = {
    id: number;
    name: string;
};

export async function getTeamsByFormInput(
    input: string
): Promise<ApiResponse<{ teams: Team[] }>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await getTeamsByInputServerValidation(input);

        const teams = await getTeamsByInput(input);

        if (!teams)
            return new ApiResponse(
                true,
                200,
                "Brak drużyn do dopasowania na podstawie formularza"
            );

        const mappedData = teams.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej pobierania listy drużyn na podstawie formularza",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(
            true,
            200,
            "Pobrano listę drużyn na podstawie formularza",
            {
                teams: mappedData,
            }
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
                createdById: userId,
                updatedById: userId,
            });
            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            errorType: ErrorType.APP,
            description:
                "Wewnętrzny błąd serwera podczas pobierania listy drużyn na podstawie formularza: " +
                error,
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
