import prisma from "@/prisma";

interface Gadget {
    id: number;
    gadgetTypeId: number;
    teamId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getGadget(id: number) {
    try {
        let record: Gadget;
        record = await prisma.gadget.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllGadgets() {
    try {
        let records: Gadget[];
        records = await prisma.gadget.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createGadget(gagdet: Gadget) {
    try {
        let record: Gadget;
        record = await prisma.gadget.create({
            data: gagdet,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateGagdet(id: number, updatedData: Partial<Gadget>) {
    try {
        let record: Gadget;
        record = await prisma.gadget.update({
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

export async function deleteGadget(id: number) {
    try {
        await prisma.gadget.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
