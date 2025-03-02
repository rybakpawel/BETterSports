import prisma from "@/prisma";
import { PersonKey, IPersonUpdate } from "./Person";

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
        console.error(error);
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

        console.log("User and Person updated successfully:", {
            updatedUser,
            updatedPerson,
        }); // do poprawy przy obsłudze błędów (jak wszystkie funkcje tutaj)
    } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
    }
}

// 1 usage
export async function validateExistingUser(
    email: string,
    username: string
): Promise<IUser | undefined> {
    try {
        const record = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        return record;
    } catch (error) {
        console.error(error);
    }
}
