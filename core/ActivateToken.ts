import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getActivateToken(
    whereClause: Prisma.ActivateTokenWhereInput,
    includeOptions?: Prisma.ActivateTokenInclude
) {
    try {
        const record = await prisma.activateToken.findFirst({
            where: whereClause,
            include: {
                user: includeOptions?.user ?? false,
                createdBy: includeOptions?.createdBy ?? false,
                updatedBy: includeOptions?.updatedBy ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania tokenu aktywacyjnego",
            error as string
        );
    }
}

export async function createActivateToken(
    activateToken: Prisma.ActivateTokenCreateInput
) {
    try {
        const record = await prisma.activateToken.create({
            data: activateToken,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia tokenu aktywacyjnego",
            error as string
        );
    }
}

export async function updateActivateToken(
    id: number,
    updatedData: Prisma.ActivateTokenUpdateInput
) {
    try {
        const record = await prisma.activateToken.update({
            where: {
                id,
            },
            data: updatedData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji tokenu aktywacyjnego",
            error as string
        );
    }
}
