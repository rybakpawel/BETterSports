import prisma from "@/prisma";

interface Log {
    id: number;
    moduleId: number;
    description: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getLog(id: number) {
    try {
        let record: Log;
        record = await prisma.log.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllLogs() {
    try {
        let records: Log[];
        records = await prisma.log.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createLog(log: Log) {
    try {
        let record: Log;
        record = await prisma.log.create({
            data: log,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateLog(id: number, updatedData: Partial<Log>) {
    try {
        let record: Log;
        record = await prisma.log.update({
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

export async function deleteLog(id: number) {
    try {
        await prisma.log.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
