import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getUserPreferences(
    whereClause: Prisma.UserPreferencesWhereInput,
    includeOptions?: Prisma.UserPreferencesInclude
) {
    try {
        const record = await prisma.userPreferences.findFirst({
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
            "Wystąpił błąd podczas pobierania preferencji użytkownika",
            error as string
        );
    }
}

export async function createUserPreferences(
    preferences: Prisma.UserPreferencesCreateInput
) {
    try {
        const record = await prisma.userPreferences.create({
            data: preferences,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia preferencji użytkownika",
            error as string
        );
    }
}

export async function updateUserPreferences(
    id: number,
    updatedData: Prisma.UserPreferencesUpdateInput
) {
    try {
        const record = await prisma.userPreferences.update({
            where: { id },
            data: updatedData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji preferencji użytkownika",
            error as string
        );
    }
}

export async function deleteUserPreferences(id: number) {
    try {
        const record = await prisma.userPreferences.delete({
            where: { id },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas usuwania preferencji użytkownika",
            error as string
        );
    }
}
