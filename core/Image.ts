import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export interface IImage {
    id: number;
    name: string;
    url: string;
    createdAt: Date;
    createdBy: number | connect;
    updatedAt: Date;
    updatedBy: number | connect;
}

type connect = {
    connect: {
        id: number;
    };
};

// 1 usage
export async function createImage(image: Partial<IImage>) {
    try {
        const record = await prisma.image.create({
            data: image,
        });

        return { record };
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas tworzenia obrazu");
    }
}

// 1 usage
export async function deleteImage(imageId: number) {
    try {
        await prisma.image.delete({
            where: { id: imageId },
        });

        console.log(
            `Obraz o ID ${imageId} został usunięty, a powiązane pola w User ustawione na NULL.`
        );
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas usuwania obrazu");
    }
}
