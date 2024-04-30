import prisma from "@/prisma";

interface Team {
    id: number;
    name: string;
    coachId: number;
    primaryColorId: number;
    secondaryColorId: number;
    logoId: number;
    leagueId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getTeam(id: number) {
    try {
        let record: Team;
        record = await prisma.team.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllTeams() {
    try {
        let records: Team[];
        records = await prisma.team.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createTeam(team: Team) {
    try {
        let record: Team;
        record = await prisma.team.create({
            data: team,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateTeam(id: number, updatedData: Partial<Team>) {
    try {
        let record: Team;
        record = await prisma.team.update({
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

export async function deleteTeam(id: number) {
    try {
        await prisma.team.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
