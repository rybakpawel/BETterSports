import prisma from "@/prisma";

interface Color {
    id: number;
    name: string;
    hexCode: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getColor(id: number) {
    try {
        let record: Color;
        record = await prisma.color.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllColors() {
    try {
        let records: Color[];
        records = await prisma.color.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createColor(color: Color) {
    try {
        let record: Color;
        record = await prisma.color.create({
            data: color,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateColor(id: number, updatedData: Partial<Color>) {
    try {
        let record: Color;
        record = await prisma.color.update({
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

export async function deleteColor(id: number) {
    try {
        await prisma.color.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
