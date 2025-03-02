import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser, updateUserAndPersonByUserId } from "@/core/User";
import { deleteImage } from "@/core/Image";
import { deleteS3Image } from "@/helpers/deleteS3";

export async function POST(res: NextResponse) {
    try {
        // Log operation
        const session = await getServerSession(authOptions);

        // Validation
        if (!session) {
            return NextResponse.json({
                message:
                    "Użytkownik uprawniony do usunięcia konta nie jest zalogowany.",
                res: null,
            });
        }

        // Technical actions
        const user = await getUser(
            { id: Number(session.user.id) },
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
                updatedById: Number(session.user.id),
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
        // Rest of logic

        return NextResponse.json({
            message: "Konto usunięte",
            res: null,
        });
    } catch (error) {
        const errorMessage = (error as Error).message;

        return NextResponse.json(errorMessage); // do poprawy podczas prac nad systemem obsługi błędów i logów
    }
}
