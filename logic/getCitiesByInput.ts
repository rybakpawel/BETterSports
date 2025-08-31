import { getCitiesByInput } from "@/core/City";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCitiesByInputServerValidation } from "@/validation/server/getCitiesByInputServerValidation";

const LOCATION = "app/logic/getCitiesByFormInput";

type City = {
    id: number;
    name: string;
};

export async function getCitiesByFormInput(
    input: string
): Promise<ApiResponse<{ cities: City[] }>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await getCitiesByInputServerValidation(input);

        const cities = await getCitiesByInput(input);

        if (!cities)
            return new ApiResponse(
                true,
                200,
                "Brak miasta do dopasowania na podstawie formularza"
            );

        const mappedData = cities.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej pobierania listy miast na podstawie formularza",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(
            true,
            200,
            "Pobrano listę miast na podstawie formularza",
            {
                cities: mappedData,
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
                "Wewnętrzny błąd serwera podczas pobierania listy miast na podstawie formularza",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
