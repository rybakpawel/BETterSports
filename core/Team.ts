import prisma from "@/prisma";

export interface ITeam {
    id: number;
    name: string;
    coach: number | connect;
    primaryColor: string | connect;
    secondaryColor: string | connect;
    tertiaryColor: string | connect;
    logo: number | connect;
    league: number | connect;
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
export async function getTeamsByInput(input: string) {
    try {
        const records = await prisma.team.findMany({
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

// ! do użycia przy tworzeniu nowej drużyny w ustawieniach
export async function createTeam(team: Partial<ITeam>) {
    try {
        const record = await prisma.team.create({
            data: team,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}
