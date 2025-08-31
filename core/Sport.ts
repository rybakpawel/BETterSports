import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

// 1 usage
export async function getAllSports() {
    try {
        const records = await prisma.sport.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania listy wszystkich sportów"
        );
    }
}

export async function getSportById(sportId: number) {
    try {
        const record = await prisma.sport.findUnique({
            where: { id: sportId },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania sportu na podstawie jego identyfikatora"
        );
    }
}
