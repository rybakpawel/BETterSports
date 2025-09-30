import prisma from "@/prisma";
import { Prisma, Role } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function getUser(
    whereClause: Prisma.UserWhereInput,
    includeOptions?: Prisma.UserInclude
) {
    try {
        const record = await prisma.user.findFirst({
            where: whereClause,
            include: {
                person: includeOptions?.person ?? false,
                profileImage: includeOptions?.profileImage ?? false,
                backgroundImage: includeOptions?.backgroundImage ?? false,
                favouriteSport: includeOptions?.favouriteSport ?? false,
                favouriteTeam: includeOptions?.favouriteTeam ?? false,
                city: includeOptions?.city ?? false,
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania użytkownika",
            error as string
        );
    }
}

export async function getSystemUser() {
    try {
        const record = await prisma.user.findFirst({
            where: {
                role: Role.SYSTEM,
            },
        });

        if (!record) {
            throw new CoreError("Nie znaleziono użytkownika systemowego");
        }

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania użytkownika systemowego",
            error as string
        );
    }
}

export async function updateUserAndPersonByUserId(
    userId: number,
    userData: Prisma.UserUpdateInput,
    personData: Prisma.PersonUpdateInput
) {
    try {
        const [updatedUser, updatedPerson] = await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: userData,
            }),
            prisma.person.update({
                where: {
                    id: (
                        await prisma.user.findUnique({
                            where: { id: userId },
                            select: { personId: true },
                        })
                    )?.personId,
                },
                data: personData,
            }),
        ]);
        return { updatedUser, updatedPerson };
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji użytkownika i osoby na podstawie identyfikatora użytkownika",
            error as string
        );
    }
}

export async function createUser(user: Prisma.UserCreateInput) {
    try {
        const record = await prisma.user.create({
            data: user,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia użytkownika",
            error as string
        );
    }
}

export async function updateUser(
    id: number,
    updatedData: Prisma.UserUpdateInput
) {
    try {
        const record = await prisma.user.update({
            where: {
                id,
            },
            data: updatedData,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji użytkownika",
            error as string
        );
    }
}
