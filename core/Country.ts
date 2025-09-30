import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getAllCountries() {
    try {
        const records = await prisma.country.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania listy krajów",
            error as string
        );
    }
}

export async function getCountry(
    whereClause: Prisma.CountryWhereInput,
    includeOptions?: Prisma.CountryInclude
) {
    try {
        const record = await prisma.country.findFirst({
            where: whereClause,
            include: {
                city: includeOptions?.city ?? false,
                createdBy: includeOptions?.createdBy ?? false,
                flag: includeOptions?.flag ?? false,
                updatedBy: includeOptions?.updatedBy ?? false,
                league: includeOptions?.league ?? false,
                person: includeOptions?.person ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania kraju",
            error as string
        );
    }
}
