import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getAllSports() {
    try {
        const records = await prisma.sport.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania listy wszystkich sportów",
            error as string
        );
    }
}

export async function getSport(
    whereClause: Prisma.SportWhereInput,
    includeOptions?: Prisma.SportInclude
) {
    try {
        const record = await prisma.sport.findFirst({
            where: whereClause,
            include: {
                createdBy: includeOptions?.createdBy ?? false,
                updatedBy: includeOptions?.updatedBy ?? false,
                event: includeOptions?.event ?? false,
                league: includeOptions?.league ?? false,
                user: includeOptions?.user ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania sportu",
            error as string
        );
    }
}
