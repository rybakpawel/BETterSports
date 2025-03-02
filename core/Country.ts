import prisma from "@/prisma";

// 1 usage
export async function getAllCountries() {
    try {
        const records = await prisma.country.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        console.error(error);
    }
}
