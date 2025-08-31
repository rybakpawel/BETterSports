import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export interface IResetPasswordToken {
    id: number;
    token: string;
    user: number | connectUser;
    createdAt: Date;
    createdBy: number | connectUser;
    updatedAt: Date;
    updatedBy: number | connectUser;
}

export interface IResetPasswordTokenWhereClause {
    id?: number;
    token?: string;
    userId?: number;
    createdAt?: Date;
    createdById?: number;
    updatedAt?: Date;
    updatedById?: number;
}

type connectUser = {
    connect: {
        id: number;
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
        throw new CoreError(
            "Wystąpił błąd podczas pobierania tokenu do resetowania hasła"
        );
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
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia tokenu do resetowania hasła"
        );
    }
}
