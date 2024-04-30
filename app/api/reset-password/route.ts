import { NextRequest, NextResponse } from "next/server";
import { getResetPasswordToken } from "@/core/ResetPasswordToken";
import { hash } from "bcrypt";
import { IUserUpdate, updateUser } from "@/core/User";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Log operation

        const { password, userId, token } = await req.json();

        if (!password)
            return NextResponse.json({
                message: "Brak nowego hasła.",
                res: null,
            });

        if (!userId && !token)
            return NextResponse.json({
                message: "Brak identyfikatora użytkownika lub tokena.",
                res: null,
            });

        // Technical actions
        if (userId) {
            console.log("userId"); // do uzupełnienia
        } else if (token) {
            const resetPasswordToken = await getResetPasswordToken({ token });

            if (!resetPasswordToken?.record)
                return NextResponse.json({
                    message: "Podany token nie istnieje.",
                    res: null,
                });

            const hashedPassword = await hash(password, 10);

            const user: Partial<IUserUpdate> = {
                password: hashedPassword,
                updatedAt: new Date(),
                updatedBy: {
                    connect: { id: resetPasswordToken.record.userId },
                },
            };

            await updateUser(resetPasswordToken.record.userId, user);

            return NextResponse.json({
                message: "Hasło użytkownika zostało zmienione.",
                res: null,
            });
        }
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
