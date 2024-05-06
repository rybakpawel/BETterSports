import { NextResponse } from "next/server";
import { getActivateToken } from "@/core/ActivateToken";
import { IUserUpdate, updateUser } from "@/core/User";
import {
    IActivateTokenUpdate,
    updateActivateToken,
} from "@/core/ActivateToken";

export async function GET(
    res: NextResponse,
    { params }: { params: { token: string } }
) {
    try {
        // Log operation

        const { token } = params;

        // Validation

        if (!token) {
            return NextResponse.json({
                message: "Brak tokena uprawniającego do aktywacji konta.",
                res: null,
            });
        }

        // Technical actions
        const activateToken = await getActivateToken({ token });

        // Rest of logic
        if (!activateToken?.record)
            return NextResponse.json({
                message: "Podany token nie istnieje.",
                res: null,
            });

        const user: Partial<IUserUpdate> = {
            isActive: true,
            updatedAt: new Date(),
            updatedBy: { connect: { id: activateToken.record.userId } },
        };
        await updateUser(activateToken.record.userId, user);

        const updatedActivateToken: Partial<IActivateTokenUpdate> = {
            activatedAt: new Date(),
            updatedAt: new Date(),
            updatedBy: { connect: { id: activateToken.record.userId } },
        };
        await updateActivateToken(
            activateToken.record.id,
            updatedActivateToken
        );

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/`);
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
