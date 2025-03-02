import { NextResponse, NextRequest } from "next/server";
import { updateUser } from "@/core/User";
import { IImage } from "@/core/Image";
import { createImage, deleteImage } from "@/core/Image";
import { deleteS3Image } from "@/helpers/deleteS3";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Log operation
        const {
            username,
            profileImage,
            backgroundImage,
            favouriteSport,
            favouriteTeam,
            primaryColor,
            secondaryColor,
        } = await req.json();

        const { id } = params;
        const userId = Number(id);

        // Validation
        if (!userId)
            return NextResponse.json({
                message: "Brak identyfikatora użytkownika.",
                res: null,
            });

        // Technical actions
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

        const userUpdates = {
            username,
            profileImageId: newProfileImage
                ? newProfileImage.record.id
                : profileImage.id,
            backgroundImageId: newBackgroundImage
                ? newBackgroundImage.record.id
                : backgroundImage.id,
            favouriteSportId: favouriteSport ? favouriteSport : null,
            favouriteTeamId: favouriteTeam ? favouriteTeam : null,
            primaryColor,
            secondaryColor,
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

        return NextResponse.json({
            message: "Dane konta zostały zaktualizowane.",
            res: null,
        }); // do poprawy podczas prac nad systemem obsługi błędów i logów
    } catch (error) {
        const errorMessage = (error as Error).message;

        return NextResponse.json(errorMessage); // do poprawy podczas prac nad systemem obsługi błędów i logów
    }
}
