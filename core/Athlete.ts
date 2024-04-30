import prisma from "@/prisma";

interface Athlete {
    id: number;
    personId: number;
    teamId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getAthlete(id: number) {
    try {
        let record: Athlete;
        record = await prisma.athlete.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllAthletes() {
    try {
        let records: Athlete[];
        records = await prisma.athlete.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createAthlete(athlete: Athlete) {
    try {
        let record: Athlete;
        record = await prisma.athlete.create({
            data: athlete,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateAthlete(id: number, updatedData: Partial<Athlete>) {
    try {
        let record: Athlete;
        record = await prisma.athlete.update({
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

export async function deleteAthlete(id: number) {
    try {
        await prisma.athlete.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
