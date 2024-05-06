import { NextResponse } from "next/server";
import { getGlobalHeaderDataByUserId } from "@/core/User";

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
        const user = await getGlobalHeaderDataByUserId(BigInt(id));

        // Rest of logic

        return NextResponse.json({
            message: "",
            res: {
                profileImage: user?.profileImage,
                // później do obsłużenia przychodzące wiadomości
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
