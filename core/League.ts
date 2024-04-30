import prisma from "@/prisma";

interface League {
    id: number;
    countryId: number;
    sportId: number;
    division: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getLeague(id: number) {
    try {
        let record: League;
        record = await prisma.league.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllLeagues() {
    try {
        let records: League[];
        records = await prisma.league.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createLeague(league: League) {
    try {
        let record: League;
        record = await prisma.league.create({
            data: league,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateLeague(id: number, updatedData: Partial<League>) {
    try {
        let record: League;
        record = await prisma.league.update({
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

export async function deleteLeague(id: number) {
    try {
        await prisma.league.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
