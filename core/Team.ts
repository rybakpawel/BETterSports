import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

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
        throw new CoreError(
            "Wystąpił błąd podczas pobierania listy drużyn na podstawie formularza"
        );
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

export async function getTeamById(teamId: number) {
    try {
        const record = await prisma.team.findUnique({
            where: { id: teamId },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania drużyny na podstawie jej identyfikatora"
        );
    }
}
