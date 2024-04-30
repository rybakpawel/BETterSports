import prisma from "@/prisma";

interface GadgetType {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getGadgetType(id: number) {
    try {
        let record: GadgetType;
        record = await prisma.gadgetType.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllGadgetTypes() {
    try {
        let records: GadgetType[];
        records = await prisma.gadgetType.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createGadgetType(gadgetType: GadgetType) {
    try {
        let record: GadgetType;
        record = await prisma.gadgetType.create({
            data: gadgetType,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateGadgetType(
    id: number,
    updatedData: Partial<GadgetType>
) {
    try {
        let record: GadgetType;
        record = await prisma.gadgetType.update({
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

export async function deleteGadgetType(id: number) {
    try {
        await prisma.gadgetType.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
