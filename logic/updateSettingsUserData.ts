import { getSystemUser, updateUserAndPersonByUserId } from "@/core/User";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel, Gender } from "@prisma/client";
import { SettingsUserDataType } from "@/validation/common/settingsUserDataValidation";
import { settingsUserDataServerValidation } from "@/validation/server/settingsUserDataServerValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dayjs from "dayjs";

const LOCATION = "app/logic/updateSettingsUserData";

export async function updateSettingsUserData(
    settingsUserData: SettingsUserDataType
): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        settingsUserData.birthDate = dayjs(settingsUserData.birthDate);

        await settingsUserDataServerValidation(settingsUserData, userId);

        const { name, lastName, birthDate, gender, nationality, city } =
            settingsUserData;

        const userUpdates = {
            cityId: city ? city : null, // do poprawy jak miasta będą rekordami, a nie stringami
            updatedAt: new Date(),
            updatedById: userId,
        };

        const personUpdates = {
            name,
            lastName,
            birthDate: birthDate ? birthDate.toDate() : undefined,
            gender: gender ? (gender as Gender) : undefined,
            nationalityId: nationality ? nationality : null,
            updatedAt: new Date(),
            updatedById: userId,
        };
        await updateUserAndPersonByUserId(userId, userUpdates, personUpdates);

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej aktualizacji danych użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse<void>(
            true,
            200,
            "Dane użytkownika zostały zaktualizowane."
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
                "Wewnętrzny błąd serwera podczas aktualizacji danych użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
