import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

// 1 usage
export async function getAllCountries() {
    try {
        const records = await prisma.country.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas pobierania listy krajów");
    }
}

export async function getCountry(countryId: number) {
    try {
        const record = await prisma.country.findUnique({
            where: { id: countryId },
        });

        return record;
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas pobierania kraju");
    }
}
