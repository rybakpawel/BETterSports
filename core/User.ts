import prisma from "@/prisma";
import { Role } from "@prisma/client";
import { PersonKey, IPersonUpdate } from "./Person";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    person: number | createPerson;
    profileImage: number;
    backgroundImage: number;
    favouriteSport: number;
    favouriteTeam: number;
    city: number;
    primaryColor: string;
    secondaryColor: string;
    isActive: boolean;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date;
    updatedBy: number;
}

export interface UserKey {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    person?: number | createPerson;
    profileImage?: number;
    backgroundImage?: number;
    favouriteSport?: number;
    favouriteTeam?: number;
    city?: number;
    primaryColor?: string;
    secondaryColor?: string;
    isActive?: boolean;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

export interface IUserWhereClause {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    personId?: number;
    profileImageId?: number;
    backgroundImageId?: number;
    favouriteSportId?: number;
    favouriteTeamId?: number;
    cityId?: number;
    primaryColor?: string;
    secondaryColor?: string;
    isActive?: boolean;
    createdAt?: Date;
    createdById?: number;
    updatedAt?: Date;
    updatedById?: number;
}

export interface IUserUpdate {
    id: number;
    email?: string;
    username?: string;
    password?: string;
    personId?: number | null;
    profileImageId?: number | null;
    backgroundImageId?: number | null;
    favouriteSportId?: number | null;
    favouriteTeamId?: number | null;
    cityId?: number | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    isActive?: boolean;
    createdAt?: Date;
    createdById?: number | null;
    updatedAt: Date;
    updatedById: number | null;
}

type createPerson = {
    create: PersonKey;
};

export async function getUser(
    whereClause: IUserWhereClause,
    includeOptions?: Partial<Record<string, boolean>>
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
        throw new CoreError("Wystąpił błąd podczas pobierania użytkownika");
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
            "Wystąpił błąd podczas pobierania użytkownika systemowego"
        );
    }
}

// 1 usage
export async function updateUserAndPersonByUserId(
    userId: number,
    userData: Partial<IUserUpdate>,
    personData: Partial<IPersonUpdate>
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
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas aktualizacji użytkownika i osoby na podstawie identyfikatora użytkownika"
        );
    }
}

// 1 usage
export async function createUser(user: Partial<IUser>) {
    try {
        const record = await prisma.user.create({
            data: user,
        });

        return { record };
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas tworzenia użytkownika");
    }
}

// 2 usages
export async function updateUser(
    id: number,
    updatedData: Partial<IUserUpdate>
) {
    try {
        const record = await prisma.user.update({
            where: {
                id,
            },
            data: updatedData,
        });

        return { record };
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas aktualizacji użytkownika");
    }
}
