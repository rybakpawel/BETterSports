import prisma from "@/prisma";

export interface IResetPasswordToken {
    id: bigint;
    token: string;
    user: bigint | connectUser;
    createdAt: Date;
    createdBy: bigint | connectUser;
    updatedAt: Date;
    updatedBy: bigint | connectUser;
}

export interface IResetPasswordTokenWhereClause {
    id?: bigint;
    token?: string;
    userId?: bigint;
    createdAt?: Date;
    createdById?: bigint;
    updatedAt?: Date;
    updatedById?: bigint;
}

type connectUser = {
    connect: {
        id: bigint;
    };
};

// 1 usage
export async function getResetPasswordToken(
    whereClause: IResetPasswordTokenWhereClause
) {
    try {
        const record = await prisma.resetPasswordToken.findFirst({
            where: whereClause,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

// 1 usage
export async function createResetPasswordToken(
    resetPasswordToken: Partial<IResetPasswordToken>
) {
    try {
        const record = await prisma.resetPasswordToken.create({
            data: resetPasswordToken,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

// export async function deleteResetPasswordToken(id: number) {
//     try {
//         await prisma.resetPasswordToken.delete({
//             where: {
//                 id,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }
