import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";
import { hashToken } from "@/helpers/hashToken";

type TransactionClient = Omit<
    typeof prisma,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export async function getResetPasswordToken(
    whereClause: Prisma.ResetPasswordTokenWhereInput
) {
    try {
        // Jeśli wyszukujemy po tokenie, haszujemy go przed wyszukiwaniem
        let searchClause = whereClause;
        if (whereClause.token) {
            searchClause = {
                ...whereClause,
                token: hashToken(whereClause.token as string),
            };
        }

        const record = await prisma.resetPasswordToken.findFirst({
            where: searchClause,
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
    resetPasswordToken: Prisma.ResetPasswordTokenCreateInput,
    tx?: TransactionClient
) {
    try {
        // Haszujemy token przed zapisaniem do bazy danych
        const hashedTokenData = {
            ...resetPasswordToken,
            token: hashToken(resetPasswordToken.token as string),
        };

        const client = tx || prisma;
        const record = await client.resetPasswordToken.create({
            data: hashedTokenData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia tokenu do resetowania hasła",
            error as string
        );
    }
}
