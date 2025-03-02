import { NextResponse } from "next/server";
import { IUser } from "@/core/User";
import { createUserServerValidation } from "@/validation/server/createUserServerValidation";
import { hash } from "bcryptjs";
import { createUser } from "@/core/User";
import { IActivateToken, createActivateToken } from "@/core/ActivateToken";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { VerifyUser } from "@/components/emailTemplates/vefifyUser";

export async function POST(req: Request) {
    try {
        // Log operation
        const body: IUser = await req.json();

        // Validation
        const validationError = await createUserServerValidation(
            body.email,
            body.username
        );

        if (validationError)
            return NextResponse.json({
                validationError,
            });

        // Technical actions
        const hashedPassword = await hash(body.password, 10);

        const user: Partial<IUser> = {
            email: body.email,
            username: body.username,
            password: hashedPassword,
            person: {
                create: {},
            },
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const newUser = await createUser(user);

        const activateToken: Partial<IActivateToken> = {
            token: uuidv4(),
            user: {
                connect: {
                    id: newUser?.record.id as number,
                },
            },
            createdAt: new Date(),
            createdBy: {
                connect: {
                    id: newUser?.record.id as number,
                },
            },
            updatedAt: new Date(),
            updatedBy: {
                connect: {
                    id: newUser?.record.id as number,
                },
            },
        };

        const newToken = await createActivateToken(activateToken);

        // Send verification e-mail
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // do skonfigurowania gdy już będzie hosting
            to: [newUser?.record.email as string],
            subject: "Weryfikacja konta BETter",
            react: VerifyUser({
                activateToken: newToken?.record.token,
            }) as React.ReactElement,
        });

        if (error)
            return NextResponse.json({
                error,
            });

        return NextResponse.json({
            message: "Użytkownik utworzony",
            res: newUser?.record.id.toString(),
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
