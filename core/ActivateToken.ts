import prisma from "@/prisma";

export interface IActivateToken {
    id: number;
    token: string;
    user: number | connectUser;
    activatedAt: Date;
    createdAt: Date;
    createdBy: number | connectUser;
    updatedAt: Date;
    updatedBy: number | connectUser;
}

export interface IActivateTokenWhereClause {
    id?: number;
    token?: string;
    userId?: number;
    activatedAt?: Date;
    createdAt?: Date;
    createdById?: number;
    updatedAt?: Date;
    updatedById?: number;
}

export interface IActivateTokenUpdate {
    id: number;
    token: string;
    userId: { connect: { id: number } };
    activatedAt: Date;
    createdAt: Date;
    createdBy: { connect: { id: number } };
    updatedAt: Date;
    updatedBy: { connect: { id: number } };
}

type connectUser = {
    connect: {
        id: number;
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
    id: number,
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
