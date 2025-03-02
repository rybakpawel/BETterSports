import { NextResponse } from "next/server";
import { getAllCountries } from "@/core/Country";

export async function GET() {
    try {
        // Log operation

        // Validation

        // Technical actions
        const countries = await getAllCountries();

        // Rest of logic
        const mappedData = countries?.map((item) => ({
            id: item.id,
            name: item.name,
        }));

        return NextResponse.json({
            message: "",
            res: {
                countries: mappedData,
            },
        }); // do poprawy podczas prac nad systemem obsługi błędów i logów
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
