import prisma from "@/prisma";

interface Challenge {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getChallenge(id: number) {
    try {
        let record: Challenge;
        record = await prisma.challenge.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllChallenges() {
    try {
        let records: Challenge[];
        records = await prisma.challenge.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createChallenge(challenge: Challenge) {
    try {
        let record: Challenge;
        record = await prisma.challenge.create({
            data: challenge,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateChallenge(
    id: number,
    updatedData: Partial<Challenge>
) {
    try {
        let record: Challenge;
        record = await prisma.challenge.update({
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

export async function deleteChallenge(id: number) {
    try {
        await prisma.challenge.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
