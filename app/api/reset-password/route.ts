import { NextRequest, NextResponse } from "next/server";
import { getResetPasswordToken } from "@/core/ResetPasswordToken";
import { compare, hash } from "bcryptjs";
import { IUserUpdate, getUser, updateUser } from "@/core/User";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Log operation

        let { oldPassword, newPassword, userId, token } = await req.json();

        if (!newPassword)
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
            if (!oldPassword)
                return NextResponse.json({
                    message: "Brak starego hasła.",
                    res: null,
                });

            const user = await getUser({ id: Number(userId) });

            if (user?.password) {
                const isOldPasswordMatch = await compare(
                    oldPassword,
                    user.password
                );

                if (!isOldPasswordMatch) {
                    return NextResponse.json({
                        error: true,
                        message: "Stare hasło się nie zgadza.",
                        res: null,
                    });
                }
            }
        } else if (token) {
            const resetPasswordToken = await getResetPasswordToken({ token });

            if (!resetPasswordToken?.record)
                return NextResponse.json({
                    message: "Podany token nie istnieje.",
                    res: null,
                });

            userId = resetPasswordToken.record.userId;
        }

        const hashedPassword = await hash(newPassword, 10);

        const user: Partial<IUserUpdate> = {
            password: hashedPassword,
            updatedAt: new Date(),
            updatedById: Number(userId),
        };

        await updateUser(Number(userId), user);

        return NextResponse.json({
            message: "Hasło użytkownika zostało zmienione.",
            res: null,
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
