import prisma from "@/prisma";
import { PersonKey } from "./Person";

export interface IUser {
    id: bigint;
    email: string;
    username: string;
    password: string;
    person: bigint | createPerson;
    profileImage: bigint;
    backgroundImage: bigint;
    favouriteTeam: bigint;
    city: bigint;
    primaryColor: bigint;
    secondaryColor: bigint;
    isActive: boolean;
    createdAt: Date;
    createdBy: bigint;
    updatedAt: Date;
    updatedBy: bigint;
}

export interface UserKey {
    id?: bigint;
    email?: string;
    username?: string;
    password?: string;
    person?: bigint | createPerson;
    profileImage?: bigint;
    backgroundImage?: bigint;
    favouriteTeam?: bigint;
    city?: bigint;
    primaryColor?: bigint;
    secondaryColor?: bigint;
    isActive?: boolean;
    createdAt?: Date;
    createdBy?: bigint;
    updatedAt?: Date;
    updatedBy?: bigint;
}

export interface IUserWhereClause {
    id?: bigint;
    email?: string;
    username?: string;
    password?: string;
    personId?: bigint;
    profileImageId?: bigint;
    backgroundImageId?: bigint;
    favouriteTeamId?: bigint;
    cityId?: bigint;
    primaryColorId?: bigint;
    secondaryColorId?: bigint;
    isActive?: boolean;
    createdAt?: Date;
    createdById?: bigint;
    updatedAt?: Date;
    updatedById?: bigint;
}

export interface IUserUpdate {
    id: bigint;
    email: string;
    username: string;
    password: string;
    person: { connect: { id: bigint } };
    profileImage: { connect: { id: bigint } };
    backgroundImage: { connect: { id: bigint } };
    favouriteTeam: { connect: { id: bigint } };
    city: { connect: { id: bigint } };
    primaryColor: { connect: { id: bigint } };
    secondaryColor: { connect: { id: bigint } };
    isActive: boolean;
    createdAt: Date;
    createdBy: { connect: { id: bigint } };
    updatedAt: Date;
    updatedBy: { connect: { id: bigint } };
}

type createPerson = {
    create: PersonKey;
};

export async function getUser(whereClause: IUserWhereClause) {
    try {
        const record = await prisma.user.findFirst({
            where: whereClause,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

// export async function getAllUsers() {
//     try {
//         const records = await prisma.user.findMany({});

//         return { records };
//     } catch (error) {
//         console.error(error);
//     }
// }

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

// 1 usage
export async function updateUser(
    id: bigint,
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

// export async function deleteUser(id: number) {
//     try {
//         await prisma.user.delete({
//             where: {
//                 id,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

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
