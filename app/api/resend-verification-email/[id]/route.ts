import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/core/User";
import { getActivateToken } from "@/core/ActivateToken";
import { Resend } from "resend";
import { VerifyUser } from "@/components/emailTemplates/vefifyUser";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Log operation

        const { id } = params;
        const userId = Number(id);

        // Validation
        if (!userId)
            return NextResponse.json({
                message: "Brak identyfikatora użytkownika.",
                res: null,
            }); // do obsłużenia podczas systemu logowania i błędów, stworzyć funkcję w folderze Validation

        // Technical actions
        const user = await getUser({ id: userId });
        if (!user)
            return NextResponse.json({
                message: "Brak użytkowika o podanym Id.",
                res: null,
            });

        const token = await getActivateToken({ userId });
        if (!token)
            return NextResponse.json({
                message: "Brak tokenu o podanym Id.",
                res: null,
            });

        // Send verification e-mail
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // do skonfigurowania gdy już będzie hosting
            to: [user?.email as string],
            subject: "Weryfikacja konta BETter",
            react: VerifyUser({
                activateToken: token?.record?.token,
            }) as React.ReactElement,
        });

        if (error)
            return NextResponse.json({
                error,
            });

        return NextResponse.json({
            message: "E-mail weryfikacyjny został ponownie wysłany.",
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
