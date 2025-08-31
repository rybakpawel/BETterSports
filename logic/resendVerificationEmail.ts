import { getUser, getSystemUser } from "@/core/User";
import { getActivateToken } from "@/core/ActivateToken";
import { Resend } from "resend";
import { VerifyUser } from "@/components/emailTemplates/vefifyUser";
import { createLog } from "@/core/Log";
import { ErrorType, LogLevel } from "@prisma/client";
import { resendVerificationEmailServerValidation } from "@/validation/server/resendVerificationEmailServerValidation";
import {
    AppError,
    CoreError,
    ApiResponse,
} from "@/helpers/errorAndResponseHandlers";

const LOCATION = "app/logic/resendVerificationEmail";

export async function resendVerificationEmail(
    userId: number
): Promise<ApiResponse<void>> {
    const systemUser = await getSystemUser();

    try {
        await resendVerificationEmailServerValidation(userId);

        const resend = new Resend(process.env.RESEND_API_KEY);

        const user = await getUser({ id: userId });
        const token = await getActivateToken({ userId });

        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev", // do skonfigurowania gdy już będzie hosting
            to: [user?.email as string],
            subject: "Weryfikacja konta BETter",
            react: VerifyUser({
                activateToken: token?.record?.token,
            }) as React.ReactElement,
        });

        if (error) {
            throw new CoreError(
                "Błąd podczas ponownego wysłania e-maila z linkiem aktywacyjnym do konta"
            );
        }

        await createLog({
            level: LogLevel.INFO,
            description:
                "Zakończenie operacji biznesowej ponownego wysłania e-maila z linkiem aktywacyjnym do konta",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(
            true,
            200,
            "E-mail aktywacyjny został ponownie wysłany"
        );
    } catch (error) {
        if (error instanceof AppError) {
            await createLog({
                level: LogLevel.ERROR,
                errorType: error.errorType,
                description: error.message,
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
                "Wewnętrzny błąd serwera podczas ponownego wysłania e-maila z linkiem aktywacyjnym do konta",
            location: LOCATION,
            createdById: systemUser.id,
            updatedById: systemUser.id,
        });

        return new ApiResponse(false, 500, "Wewnętrzny błąd serwera");
    }
}
