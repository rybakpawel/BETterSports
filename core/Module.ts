import prisma from "@/prisma";

interface Module {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getModule(id: number) {
    try {
        let record: Module;
        record = await prisma.module.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllModules() {
    try {
        let records: Module[];
        records = await prisma.module.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createModule(module: Module) {
    try {
        let record: Module;
        record = await prisma.module.create({
            data: module,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateModule(id: number, updatedData: Partial<Module>) {
    try {
        let record: Module;
        record = await prisma.module.update({
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

export async function deleteModule(id: number) {
    try {
        await prisma.module.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
