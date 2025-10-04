import { updateUser } from "@/core/User";
import { createImage, deleteImage } from "@/core/Image";
import { deleteS3Image } from "@/helpers/deleteS3";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AppError, ApiResponse } from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { AccountDataType } from "@/validation/common/updateAccountDataValidation";
import { accountDataServerValidation } from "@/validation/server/updateAccountDataServerValidation";
import prisma from "@/prisma";

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

        const {
            username,
            favouriteSport,
            favouriteTeam,
            primaryColor,
            secondaryColor,
        } = accountData;

        await prisma.$transaction(async (tx) => {
            let newProfileImage;
            if (profileImage.newUrl) {
                const image = {
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

                newProfileImage = await createImage(image, tx);
            }

            let newBackgroundImage;
            if (backgroundImage.newUrl) {
                const image = {
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

                newBackgroundImage = await createImage(image, tx);
            }

            const userUpdates = {
                username: username || "",
                profileImage: newProfileImage
                    ? { connect: { id: newProfileImage.id } }
                    : profileImage.id
                    ? { connect: { id: profileImage.id } }
                    : { disconnect: true },
                backgroundImage: newBackgroundImage
                    ? { connect: { id: newBackgroundImage.id } }
                    : backgroundImage.id
                    ? { connect: { id: backgroundImage.id } }
                    : { disconnect: true },
                favouriteSport: favouriteSport
                    ? { connect: { id: favouriteSport } }
                    : { disconnect: true },
                favouriteTeam: favouriteTeam
                    ? { connect: { id: favouriteTeam } }
                    : { disconnect: true },
                primaryColor: primaryColor || null,
                secondaryColor: secondaryColor || null,
                updatedAt: new Date(),
                updatedBy: { connect: { id: userId } },
            };

            await updateUser(userId, userUpdates, tx);

            if (profileImage.newUrl && profileImage.id) {
                await deleteImage(profileImage.id, tx);
            }
            if (backgroundImage.newUrl && backgroundImage.id) {
                await deleteImage(backgroundImage.id, tx);
            }
        });

        if (profileImage.newUrl && profileImage.id) {
            await deleteS3Image(profileImage.url);
        }
        if (backgroundImage.newUrl && backgroundImage.id) {
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
                "Wewnętrzny błąd serwera podczas aktualizacji danych konta: " +
                error,
            location: LOCATION,
            createdById: userId,
            updatedById: userId,
        });
        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
