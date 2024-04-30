import prisma from "@/prisma";

interface ImageToFacility {
    id: number;
    imageId: number;
    facilityId: number;
    isIndoor: boolean;
    isOutdoor: boolean;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getImageToFacility(id: number) {
    try {
        let record: ImageToFacility;
        record = await prisma.imageToFacility.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllImagesToFacilities() {
    try {
        let records: ImageToFacility[];
        records = await prisma.imageToFacility.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createImageToFacility(imageToFacility: ImageToFacility) {
    try {
        let record: ImageToFacility;
        record = await prisma.imageToFacility.create({
            data: imageToFacility,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateImageToFacility(
    id: number,
    updatedData: Partial<ImageToFacility>
) {
    try {
        let record: ImageToFacility;
        record = await prisma.imageToFacility.update({
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

export async function deleteImageToFacility(id: number) {
    try {
        await prisma.imageToFacility.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
