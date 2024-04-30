import prisma from "@/prisma";

interface Sport {
    id: number;
    name: string;
    isIndividual: boolean;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getSport(id: number) {
    try {
        let record: Sport;
        record = await prisma.sport.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllSports() {
    try {
        let records: Sport[];
        records = await prisma.sport.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createSport(sport: Sport) {
    try {
        let record: Sport;
        record = await prisma.sport.create({
            data: sport,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateSport(id: number, updatedData: Partial<Sport>) {
    try {
        let record: Sport;
        record = await prisma.sport.update({
            where: {
                id,
            },
            data: updatedData,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSport(id: number) {
    try {
        await prisma.sport.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
