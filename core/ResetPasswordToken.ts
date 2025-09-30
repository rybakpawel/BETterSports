import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getResetPasswordToken(
    whereClause: Prisma.ResetPasswordTokenWhereInput
) {
    try {
        const record = await prisma.resetPasswordToken.findFirst({
            where: whereClause,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania tokenu do resetowania hasła",
            error as string
        );
    }
}

export async function createResetPasswordToken(
    resetPasswordToken: Prisma.ResetPasswordTokenCreateInput
) {
    try {
        const record = await prisma.resetPasswordToken.create({
            data: resetPasswordToken,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia tokenu do resetowania hasła",
            error as string
        );
    }
}
