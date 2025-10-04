import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";
import { hashToken } from "@/helpers/hashToken";

type TransactionClient = Omit<
    typeof prisma,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export async function getActivateToken(
    whereClause: Prisma.ActivateTokenWhereInput,
    includeOptions?: Prisma.ActivateTokenInclude
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

        const record = await prisma.activateToken.findFirst({
            where: searchClause,
            include: {
                user: includeOptions?.user ?? false,
                createdBy: includeOptions?.createdBy ?? false,
                updatedBy: includeOptions?.updatedBy ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania tokenu aktywacyjnego",
            error as string
        );
    }
}

export async function createActivateToken(
    activateToken: Prisma.ActivateTokenCreateInput,
    tx?: TransactionClient
) {
    try {
        // Haszujemy token przed zapisaniem do bazy danych
        const hashedTokenData = {
            ...activateToken,
            token: hashToken(activateToken.token as string),
        };

        const client = tx || prisma;
        const record = await client.activateToken.create({
            data: hashedTokenData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia tokenu aktywacyjnego",
            error as string
        );
    }
}

export async function updateActivateToken(
    id: number,
    updatedData: Prisma.ActivateTokenUpdateInput,
    tx?: TransactionClient
) {
    try {
        const client = tx || prisma;
        const record = await client.activateToken.update({
            where: {
                id,
            },
            data: updatedData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji tokenu aktywacyjnego",
            error as string
        );
    }
}
