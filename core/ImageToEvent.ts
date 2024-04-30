import prisma from "@/prisma";

interface ImageToEvent {
    id: number;
    imageId: number;
    eventId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getImageToEvent(id: number) {
    try {
        let record: ImageToEvent;
        record = await prisma.imageToEvent.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllImagesToEvents() {
    try {
        let records: ImageToEvent[];
        records = await prisma.imageToEvent.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createImageToEvent(imageToEvent: ImageToEvent) {
    try {
        let record: ImageToEvent;
        record = await prisma.imageToEvent.create({
            data: imageToEvent,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateImageToEvent(
    id: number,
    updatedData: Partial<ImageToEvent>
) {
    try {
        let record: ImageToEvent;
        record = await prisma.imageToEvent.update({
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

export async function deleteImageToEvent(id: number) {
    try {
        await prisma.imageToEvent.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
