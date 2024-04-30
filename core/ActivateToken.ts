import prisma from "@/prisma";

export interface IActivateToken {
    id: bigint;
    token: string;
    user: bigint | connectUser;
    activatedAt: Date;
    createdAt: Date;
    createdBy: bigint | connectUser;
    updatedAt: Date;
    updatedBy: bigint | connectUser;
}

export interface IActivateTokenWhereClause {
    id?: bigint;
    token?: string;
    userId?: bigint;
    activatedAt?: Date;
    createdAt?: Date;
    createdById?: bigint;
    updatedAt?: Date;
    updatedById?: bigint;
}

export interface IActivateTokenUpdate {
    id: bigint;
    token: string;
    userId: { connect: { id: bigint } };
    activatedAt: Date;
    createdAt: Date;
    createdBy: { connect: { id: bigint } };
    updatedAt: Date;
    updatedBy: { connect: { id: bigint } };
}

type connectUser = {
    connect: {
        id: bigint;
    };
};

// 2 usage
export async function getActivateToken(whereClause: IActivateTokenWhereClause) {
    try {
        const record = await prisma.activateToken.findFirst({
            where: whereClause,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

// export async function getAllActivateTokens() {
//     try {
//         let records: IActivateToken[];
//         records = await prisma.activateToken.findMany({});

//         return { records };
//     } catch (error) {
//         console.error(error);
//     }
// }

// 1 usage
export async function createActivateToken(
    activateToken: Partial<IActivateToken>
) {
    try {
        const record = await prisma.activateToken.create({
            data: activateToken,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

// 1 usage
export async function updateActivateToken(
    id: bigint,
    updatedData: Partial<IActivateTokenUpdate>
) {
    try {
        const record = await prisma.activateToken.update({
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

// export async function deleteActivateToken(id: number) {
//     try {
//         await prisma.activateToken.delete({
//             where: {
//                 id,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }
