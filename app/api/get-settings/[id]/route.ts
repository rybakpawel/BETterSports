import { NextResponse } from "next/server";
import { getUser } from "@/core/User";

export async function GET(
    res: NextResponse,
    { params }: { params: { id: string } }
) {
    try {
        // Log operation

        const { id } = params;

        // Validation

        if (!id) {
            return NextResponse.json({
                message: "Brak identyfikatora zalogowanego użytkownika.",
                res: null,
            });
        }

        // Technical actions
        const user = await getUser(
            { id: Number(id) },
            {
                person: true,
                profileImage: true,
                backgroundImage: true,
                favouriteSport: true,
                favouriteTeam: true,
                city: true,
            }
        );

        // Rest of logic
        return NextResponse.json({
            message: "",
            settings: {
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
            },
        });
    } catch (error) {
        const errorMessage = (error as Error).message;

        return NextResponse.json(errorMessage); // do poprawy podczas prac nad systemem obsługi błędów i logów
    }
}

// {                                Obiekt odpowiedzi z api (być może do utworzenie w osobnym katalogu i importowany w każdym endpoincie)
//     status: number,
//     message: string,
//     data: any
// }
