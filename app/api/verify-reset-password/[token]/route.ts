import { NextResponse } from "next/server";
import { getResetPasswordToken } from "@/core/ResetPasswordToken";

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
                message: "Brak tokena uprawniającego do zmiany hasła.",
                res: null,
            });
        }

        // Technical actions
        const resetPasswordToken = await getResetPasswordToken({ token });

        // Rest of logic
        if (!resetPasswordToken?.record)
            return NextResponse.json({
                message: "Podany token nie istnieje.",
                res: null,
            });

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_URL}/reset-password/${token}`
        );
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
