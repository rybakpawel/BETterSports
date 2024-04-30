import prisma from "@/prisma";

interface Image {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getImage(id: number) {
    try {
        let record: Image;
        record = await prisma.image.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllImages() {
    try {
        let records: Image[];
        records = await prisma.image.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createImage(image: Image) {
    try {
        let record: Image;
        record = await prisma.image.create({
            data: image,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateImage(id: number, updatedData: Partial<Image>) {
    try {
        let record: Image;
        record = await prisma.image.update({
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

export async function deleteImage(id: number) {
    try {
        await prisma.image.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
