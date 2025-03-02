import { NextResponse, NextRequest } from "next/server";
import { getTeamsByInput } from "@/core/Team";

export async function POST(req: NextRequest) {
    try {
        // Log operation
        const input = await req.json();

        // Validation

        if (!input)
            return NextResponse.json({
                message: "Brak danych do zastosowania w filtrach.",
            });

        // Technical actions
        const teams = await getTeamsByInput(input);

        // Rest of logic
        const mappedData = teams?.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        return NextResponse.json({
            message: "",
            teams: mappedData,
        }); // TODO do poprawy podczas prac nad systemem obsługi błędów i logów
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
