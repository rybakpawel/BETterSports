import prisma from "@/prisma";

export interface ICity {
    id: number;
    name: string;
    country: number | connect;
    createdAt: Date;
    createdBy: number | connect;
    updatedAt: Date;
    updatedBy: number | connect;
}

type connect = {
    connect: {
        id: number;
    };
};

// 1 usage
export async function getCitiesByInput(input: string) {
    try {
        const records = await prisma.city.findMany({
            where: {
                name: {
                    startsWith: input,
                    mode: "insensitive",
                },
            },
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        console.error(error);
    }
}

// 1 usage
export async function createCity(city: Partial<ICity>) {
    try {
        const record = await prisma.city.create({
            data: city,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}
