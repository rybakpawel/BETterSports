import { NextResponse, NextRequest } from "next/server";
import { updateUserAndPersonByUserId } from "@/core/User";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Log operation
        const { name, lastName, birthDate, gender, nationality, city } =
            await req.json();

        const { id } = params;
        const userId = Number(id);

        // Validation
        if (!userId)
            return NextResponse.json({
                message: "Brak identyfikatora użytkownika.",
                res: null,
            });

        // Technical actions
        const userUpdates = {
            cityId: city ? city : null, // do poprawy jak miasta będą rekordami, a nie stringami
            updatedAt: new Date(),
            updatedById: userId,
        };

        const personUpdates = {
            name,
            lastName,
            birthDate: birthDate ? birthDate : null,
            gender: gender ? gender : null,
            nationalityId: nationality ? nationality : null,
            updatedAt: new Date(),
            updatedById: userId,
        };
        await updateUserAndPersonByUserId(userId, userUpdates, personUpdates);

        return NextResponse.json({
            message: "Dane użytkownika zostały zaktualizowane.",
            res: null,
        }); // do poprawy podczas prac nad systemem obsługi błędów i logów
    } catch (error) {
        const errorMessage = (error as Error).message;

        return NextResponse.json(errorMessage); // do poprawy podczas prac nad systemem obsługi błędów i logów
    }
}
