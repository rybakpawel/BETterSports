import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/core/User";
import {
    IResetPasswordToken,
    createResetPasswordToken,
} from "@/core/ResetPasswordToken";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { ResetPassword } from "@/components/emailTemplates/resetPassword";

export async function POST(req: Request) {
    try {
        // Log operation

        const email: string = await req.json();

        // Validation
        if (!email)
            return NextResponse.json({
                message: "Brak e-maila użytkownika.",
                res: null,
            }); // do poprawy podczas prac nad systemem obsługi błędów i logów

        // Technical actions
        const user = await getUser({ email });
        if (!user?.record)
            return NextResponse.json({
                message: "Brak użytkownika o podanym e-mailu.",
                res: null,
            });
        // if (!user.record?.isActive) return "Użytkownik nie jest aktywny.";

        const resetPasswordToken: Partial<IResetPasswordToken> = {
            token: uuidv4(),
            user: {
                connect: {
                    id: user?.record.id as bigint,
                },
            },
            createdAt: new Date(),
            createdBy: {
                connect: {
                    id: user?.record.id as bigint,
                },
            },
            updatedAt: new Date(),
            updatedBy: {
                connect: {
                    id: user?.record.id as bigint,
                },
            },
        };

        const newResetPasswordToken = await createResetPasswordToken(
            resetPasswordToken
        );

        // Send verification e-mail
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // do skonfigurowania gdy już będzie hosting
            to: [user?.record?.email as string],
            subject: "BETter - nowe hasło",
            react: ResetPassword({
                resetPasswordToken: newResetPasswordToken?.record.token,
            }) as React.ReactElement,
        });

        if (error)
            return NextResponse.json({
                error,
            });

        return NextResponse.json({
            message: "E-mail z tokenem do zresetowania hasła został wysłany.",
            res: null,
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
