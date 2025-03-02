import { NextResponse } from "next/server";
import { ICity } from "@/core/City";
import { createCity } from "@/core/City";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        // Log operation
        const body: ICity = await req.json();

        // Validation

        // Technical actions
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            throw new Error(
                "Nie można pobrać identyfikatora użytkownika. Upewnij się, że użytkownik jest zalogowany."
            ); // TODO do poprawy podczas pracy nad obsługą błędów
        }

        const userId = Number(session?.user.id);

        const city: Partial<ICity> = {
            name: body.name,
            country: {
                connect: {
                    id: Number(body.country),
                },
            },
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

        const newCity = await createCity(city);

        return NextResponse.json({
            message: "Miasto utworzone",
            res: newCity?.record.id.toString(),
        }); // TODO do poprawy podczas prac nad systemem obsługi błędów i logów
    } catch (error) {
        const errorMessage = (error as Error).message;

        return NextResponse.json(errorMessage); // TODO do poprawy podczas prac nad systemem obsługi błędów i logów
    }
}
