import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

type TransactionClient = Omit<
    typeof prisma,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

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
            "Wystąpił błąd podczas pobierania listy drużyn na podstawie formularza",
            error as string
        );
    }
}

export async function createTeam(
    team: Prisma.TeamCreateInput,
    tx?: TransactionClient
) {
    try {
        const client = tx || prisma;
        const record = await client.team.create({
            data: team,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia drużyny",
            error as string
        );
    }
}

export async function getTeam(
    whereClause: Prisma.TeamWhereInput,
    includeOptions?: Prisma.TeamInclude
) {
    try {
        const record = await prisma.team.findFirst({
            where: whereClause,
            include: {
                coach: includeOptions?.coach ?? false,
                createdBy: includeOptions?.createdBy ?? false,
                league: includeOptions?.league ?? false,
                logo: includeOptions?.logo ?? false,
                updatedBy: includeOptions?.updatedBy ?? false,
                athlete: includeOptions?.athlete ?? false,
                eventTeam1: includeOptions?.eventTeam1 ?? false,
                eventTeam2: includeOptions?.eventTeam2 ?? false,
                gadget: includeOptions?.gadget ?? false,
                user: includeOptions?.user ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania drużyny",
            error as string
        );
    }
}
