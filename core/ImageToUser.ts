import prisma from "@/prisma";

interface ImageToUser {
    id: number;
    imageId: number;
    userId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getImageToUser(id: number) {
    try {
        let record: ImageToUser;
        record = await prisma.imageToUser.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllImagesToUsers() {
    try {
        let records: ImageToUser[];
        records = await prisma.imageToUser.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createImageToUser(imageToUser: ImageToUser) {
    try {
        let record: ImageToUser;
        record = await prisma.imageToUser.create({
            data: imageToUser,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateImageToUser(
    id: number,
    updatedData: Partial<ImageToUser>
) {
    try {
        let record: ImageToUser;
        record = await prisma.imageToUser.update({
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

export async function deleteImageToUser(id: number) {
    try {
        await prisma.imageToUser.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
