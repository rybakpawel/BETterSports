import { updateUser } from "@/core/User";
import { IImage } from "@/core/Image";
import { createImage, deleteImage } from "@/core/Image";
import { deleteS3Image } from "@/helpers/deleteS3";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSystemUser } from "@/core/User";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AccountDataType } from "@/validation/common/accountDataValidation";
import { accountDataServerValidation } from "@/validation/server/accountDataServerValidation";

const LOCATION = "app/logic/updateAccountData";

export async function updateAccountData(
    accountData: AccountDataType,
    profileImage: {
        id: number;
        name: string;
        url: string;
        newUrl: string;
    },
    backgroundImage: {
        id: number;
        name: string;
        url: string;
        newUrl: string;
    }
): Promise<ApiResponse<void>> {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);

    try {
        await accountDataServerValidation(accountData, userId);

        let newProfileImage;
        if (profileImage.newUrl) {
            const image: Partial<IImage> = {
                name: profileImage.name,
                url: profileImage.newUrl,
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

            newProfileImage = await createImage(image);
        }

        let newBackgroundImage;
        if (backgroundImage.newUrl) {
            const image: Partial<IImage> = {
                name: backgroundImage.name,
                url: backgroundImage.newUrl,
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

            newBackgroundImage = await createImage(image);
        }

        const {
            username,
            favouriteSport,
            favouriteTeam,
            primaryColor,
            secondaryColor,
        } = accountData;

        const userUpdates = {
            username: username || "",
            profileImageId: newProfileImage
                ? newProfileImage.record.id
                : profileImage.id || null,
            backgroundImageId: newBackgroundImage
                ? newBackgroundImage.record.id
                : backgroundImage.id || null,
            favouriteSportId: favouriteSport || null,
            favouriteTeamId: favouriteTeam || null,
            primaryColor: primaryColor || null,
            secondaryColor: secondaryColor || null,
            updatedAt: new Date(),
            updatedById: userId,
        };

        await updateUser(userId, userUpdates);

        if (profileImage.newUrl && profileImage.id) {
            deleteImage(profileImage.id);
            await deleteS3Image(profileImage.url);
        }
        if (backgroundImage.newUrl && backgroundImage.id) {
            deleteImage(backgroundImage.id);
            await deleteS3Image(backgroundImage.url);
        }

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej aktualizacji danych konta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });

        return new ApiResponse<void>(
            true,
            200,
            "Dane konta zostały zaktualizowane"
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
                "Wewnętrzny błąd serwera podczas aktualizacji danych konta",
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
