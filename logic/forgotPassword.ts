import { getUser, getSystemUser } from "@/core/User";
import { createResetPasswordToken } from "@/core/ResetPasswordToken";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { ResetPassword } from "@/components/emailTemplates/resetPassword";
import {
    AppError,
    CoreError,
    ApiResponse,
} from "@/helpers/errorAndResponseHandlers";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { forgotPasswordServerValidation } from "@/validation/server/forgotPasswordServerValidation";

const LOCATION = "app/logic/forgotPassword";

export async function forgotPassword(
    email: string
): Promise<ApiResponse<void>> {
    const systemUser = await getSystemUser();

    try {
        await forgotPasswordServerValidation({ email });

        const user = await getUser({ email });

        const resetPasswordToken = {
            token: uuidv4(),
            user: {
                connect: {
                    id: user?.id as number,
                },
            },
            createdAt: new Date(),
            createdBy: {
                connect: {
                    id: user?.id as number,
                },
            },
            updatedAt: new Date(),
            updatedBy: {
                connect: {
                    id: user?.id as number,
                },
            },
        };

        const newResetPasswordToken = await createResetPasswordToken(
            resetPasswordToken
        );

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // TODO do skonfigurowania gdy już będzie hosting
            to: [user?.email as string],
            subject: "BETter - nowe hasło",
            react: ResetPassword({
                resetPasswordToken: newResetPasswordToken?.token,
            }) as React.ReactElement,
        });

        if (error) {
            throw new CoreError(
                "Błąd podczas wysyłania e-maila z tokenem do zresetowania hasła"
            );
        }

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej wysyłania e-maila z tokenem do zresetowania hasła",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(
            true,
            200,
            "Wysłaliśmy na Twój e-mail link wraz z instrukcją, umożliwiające ustawienie nowego hasła do Twojego konta"
        );
    } catch (error) {
        if (error instanceof AppError) {
            await createLog({
                level: LogLevel.ERROR,
                errorType: error.errorType,
                description:
                    error.message +
                    (error.messageLog ? ": " + error.messageLog : ""),
                location: LOCATION,
                createdById: systemUser.id,
                updatedById: systemUser.id,
            });
            return new ApiResponse(false, error.statusCode, error.message);
        }

        await createLog({
            level: LogLevel.ERROR,
            errorType: ErrorType.APP,
            description:
                "Wewnętrzny błąd serwera podczas wysyłania e-maila z tokenem do zresetowania hasła: " +
                error,
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
