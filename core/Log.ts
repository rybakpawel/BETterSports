import prisma from "@/prisma";
import { ErrorType, LogLevel, Prisma } from "@prisma/client";

interface ICreateLog {
    level: LogLevel;
    errorType?: ErrorType;
    description: string;
    location: string;
    createdById: number;
    updatedById: number;
    data?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}

export async function createLog(log: ICreateLog) {
    try {
        await prisma.log.create({
            data: log,
        });
    } catch (error) {
        console.error(error);
    }
}
