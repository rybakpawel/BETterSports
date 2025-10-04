import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

type TransactionClient = Omit<
    typeof prisma,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export async function createImage(
    image: Prisma.ImageCreateInput,
    tx?: TransactionClient
) {
    try {
        const client = tx || prisma;
        const record = await client.image.create({
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

export async function deleteImage(imageId: number, tx?: TransactionClient) {
    try {
        const client = tx || prisma;
        await client.image.delete({
            where: { id: imageId },
        });
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas usuwania obrazu",
            error as string
        );
    }
}
