import prisma from "@/prisma";

interface UserToGadget {
    id: number;
    userId: number;
    gadgetId: number;
    name: string;
    description: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getUserToGadget(id: number) {
    try {
        let record: UserToGadget;
        record = await prisma.userToGadget.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllUsersToGadgets() {
    try {
        let records: UserToGadget[];
        records = await prisma.userToGadget.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createUserToGadget(userToGadget: UserToGadget) {
    try {
        let record: UserToGadget;
        record = await prisma.userToGadget.create({
            data: userToGadget,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateUserToGadgete(
    id: number,
    updatedData: Partial<UserToGadget>
) {
    try {
        let record: UserToGadget;
        record = await prisma.userToGadget.update({
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

export async function deleteUserToGadget(id: number) {
    try {
        await prisma.userToGadget.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
