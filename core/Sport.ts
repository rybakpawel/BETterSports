import prisma from "@/prisma";

// 1 usage
export async function getAllSports() {
    try {
        const records = await prisma.sport.findMany({
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        console.error(error);
    }
}
