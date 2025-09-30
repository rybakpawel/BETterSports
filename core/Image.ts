import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export async function createImage(image: Prisma.ImageCreateInput) {
    try {
        const record = await prisma.image.create({
            data: image,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia obrazu",
            error as string
        );
    }
}

export async function deleteImage(imageId: number) {
    try {
        await prisma.image.delete({
            where: { id: imageId },
        });
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas usuwania obrazu",
            error as string
        );
    }
}
