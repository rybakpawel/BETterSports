import prisma from "@/prisma";

interface UserToFacility {
    id: number;
    userId: number;
    facilityId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getUserToFacility(id: number) {
    try {
        let record: UserToFacility;
        record = await prisma.userToFacility.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllUsersToFacilities() {
    try {
        let records: UserToFacility[];
        records = await prisma.userToFacility.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createUserToFacility(userToFacility: UserToFacility) {
    try {
        let record: UserToFacility;
        record = await prisma.userToFacility.create({
            data: userToFacility,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateUserToFacility(
    id: number,
    updatedData: Partial<UserToFacility>
) {
    try {
        let record: UserToFacility;
        record = await prisma.userToFacility.update({
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

export async function deleteUserToFacility(id: number) {
    try {
        await prisma.userToFacility.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
