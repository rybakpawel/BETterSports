import {
    getUserPreferences,
    updateUserPreferences,
} from "@/core/UserPreferences";
import {
    AppError,
    ApiResponse,
    LogicError,
} from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { UserPreferencesType } from "@/validation/common/userPreferencesValidation";
import { userPreferencesServerValidation } from "@/validation/server/userPreferencesServerValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LOCATION = "app/logic/updateUserPreferences";

export async function updateUserPreferencesLogic(
    preferencesData: UserPreferencesType
): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await userPreferencesServerValidation(preferencesData, userId);

        const existingPreferences = await getUserPreferences({ userId });

        if (!existingPreferences) {
            throw new LogicError(
                "Preferencje użytkownika nie zostały znalezione",
                404
            );
        }

        await updateUserPreferences(existingPreferences.id, {
            showOnlyFavoriteSportContent:
                preferencesData.showOnlyFavoriteSportContent,
            prioritizeNearbyEvents: preferencesData.prioritizeNearbyEvents,
            showFriendActivitiesInFeed:
                preferencesData.showFriendActivitiesInFeed,
            pushNewEventsNearby: preferencesData.pushNewEventsNearby,
            pushFriendActivities: preferencesData.pushFriendActivities,
            pushChallengeUpdates: preferencesData.pushChallengeUpdates,
            pushTournamentUpdates: preferencesData.pushTournamentUpdates,
            emailEventReminders: preferencesData.emailEventReminders,
            emailTournamentReminders: preferencesData.emailTournamentReminders,
            emailWeeklyDigest: preferencesData.emailWeeklyDigest,
            updatedBy: { connect: { id: userId } },
        });

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej aktualizacji preferencji użytkownika",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse(
            true,
            200,
            "Zaktualizowano preferencje użytkownika"
        );
    } catch (error) {
        if (error instanceof AppError) {
            await createLog({
                level: LogLevel.ERROR,
                description: error.message + ": " + error.messageLog,
                location: LOCATION,
                createdById: userId || 0,
                updatedById: userId || 0,
                errorType: error.errorType,
            });

            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            description: `Nieoczekiwany błąd podczas aktualizacji preferencji użytkownika: ${error}`,
            location: LOCATION,
            createdById: userId || 0,
            updatedById: userId || 0,
            errorType: ErrorType.APP,
        });

        return new ApiResponse(
            false,
            500,
            "Wystąpił nieoczekiwany błąd podczas aktualizacji preferencji użytkownika"
        );
    }
}
