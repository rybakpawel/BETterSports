import prisma from "@/prisma";

interface ImageToGadget {
    id: number;
    imageId: number;
    gadgetId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getImageToGadget(id: number) {
    try {
        let record: ImageToGadget;
        record = await prisma.imageToGadget.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllImagesToGadgets() {
    try {
        let records: ImageToGadget[];
        records = await prisma.imageToGadget.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createImageToGadget(imageToGadget: ImageToGadget) {
    try {
        let record: ImageToGadget;
        record = await prisma.imageToGadget.create({
            data: imageToGadget,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateImageToGadget(
    id: number,
    updatedData: Partial<ImageToGadget>
) {
    try {
        let record: ImageToGadget;
        record = await prisma.imageToGadget.update({
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

export async function deleteImageToGadget(id: number) {
    try {
        await prisma.imageToGadget.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
