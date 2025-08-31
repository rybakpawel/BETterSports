import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { updateUserAndPersonByUserId, getUser } from "@/core/User";
import { deleteS3Image } from "@/helpers/deleteS3";
import { deleteImage } from "@/core/Image";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { deleteAccountServerValidation } from "@/validation/server/deleteAccountServerValidation";

const LOCATION = "app/logic/deleteAccount";

export async function deleteAccount(): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await deleteAccountServerValidation(userId);

        const user = await getUser(
            { id: userId },
            { person: true, profileImage: true, backgroundImage: true }
        );

        if (user?.profileImage?.id) {
            deleteImage(user.profileImage.id);
            await deleteS3Image(user.profileImage.url);
        }
        if (user?.backgroundImage?.id) {
            deleteImage(user.backgroundImage.id);
            await deleteS3Image(user.backgroundImage.url);
        }

        if (user) {
            const userUpdates = {
                email: "",
                username: "",
                password: "",
                profileImageId: null,
                backgroundImageId: null,
                favouriteSportId: null,
                favouriteTeamId: null,
                cityId: null,
                primaryColor: "",
                secondaryColor: "",
                isActive: false,
                updatedAt: new Date(),
                updatedById: Number(session?.user.id),
            };

            const personUpdates = {
                name: "",
                lastName: "",
                birthDate: undefined,
                gender: undefined,
                nationalityId: null,
                updatedAt: new Date(),
                updatedById: user.person.id,
            };

            await updateUserAndPersonByUserId(
                Number(user.id),
                userUpdates,
                personUpdates
            );
        }

        await createLog({
            level: LogLevel.INFO,
            description: "Zakończenie operacji biznesowej usuwania konta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse<void>(true, 200, "Konto zostało usunięte");
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
            description: "Wewnętrzny błąd serwera podczas usuwania konta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
