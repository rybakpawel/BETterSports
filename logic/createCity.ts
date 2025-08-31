import { ICity } from "@/core/City";
import { createCity as createCityCore } from "@/core/City";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSystemUser } from "@/core/User";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { CreateCityType } from "@/validation/common/createCityValidation";
import { createCityServerValidation } from "@/validation/server/createCityServerValidation";

const LOCATION = "app/logic/createCity";

export async function createCity(
    cityData: CreateCityType
): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await createCityServerValidation(cityData, userId);

        const { country, name } = cityData;

        const city: Partial<ICity> = {
            name,
            country: {
                connect: {
                    id: country,
                },
            },
            createdAt: new Date(),
            createdBy: {
                connect: {
                    id: userId,
                },
            },
            updatedAt: new Date(),
            updatedBy: {
                connect: {
                    id: userId,
                },
            },
        };

        await createCityCore(city);

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej tworzenia nowego miasta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse<void>(true, 200, "Miasto zostało utworzone");
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
                "Wewnętrzny błąd serwera podczas tworzenia nowego miasta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
