import { getUser } from "@/core/User";
import { getSettingsServerValidation } from "@/validation/server/getSettingsServerValidations";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { UserSettings } from "@/types/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LOCATION = "app/logic/getUserSettings";

export async function getUserSettings(): Promise<
    ApiResponse<{ settings: UserSettings }>
> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await getSettingsServerValidation(userId);

        const user = await getUser(
            { id: userId },
            {
                person: true,
                profileImage: true,
                backgroundImage: true,
                favouriteSport: true,
                favouriteTeam: true,
                city: true,
            }
        );

        const settings: UserSettings = {
            email: user?.email,
            username: user?.username,
            profileImageId: user?.profileImage?.id,
            profileImageName: user?.profileImage?.name,
            profileImageUrl: user?.profileImage?.url,
            backgroundImageId: user?.backgroundImage?.id,
            backgroundImageName: user?.backgroundImage?.name,
            backgroundImageUrl: user?.backgroundImage?.url,
            favouriteSportId: user?.favouriteSport?.id,
            isFavouriteSportIndividual: user?.favouriteSport?.isIndividual,
            favouriteTeamId: user?.favouriteTeam?.id,
            favouriteTeamName: user?.favouriteTeam?.name,
            cityId: user?.city?.id,
            cityName: user?.city?.name,
            primaryColor: user?.primaryColor,
            secondaryColor: user?.secondaryColor,
            name: user?.person?.name,
            lastName: user?.person?.lastName,
            birthDate: user?.person?.birthDate,
            gender: user?.person?.gender,
            nationalityId: user?.person?.nationalityId,
        };

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej pobierania ustawień użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(true, 200, "Pobrano ustawienia użytkownika", {
            settings,
        });
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
                "Wewnętrzny błąd serwera podczas pobierania ustawień użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
