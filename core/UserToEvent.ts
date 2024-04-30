import prisma from "@/prisma";

interface UserToEvent {
    id: number;
    userId: number;
    eventId: number;
    tourGroupId: number;
    sportsRate: number;
    atmosphereRate: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getUserToEvent(id: number) {
    try {
        let record: UserToEvent;
        record = await prisma.userToEvent.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllUsersToEvents() {
    try {
        let records: UserToEvent[];
        records = await prisma.userToEvent.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createUserToEvent(userToEvent: UserToEvent) {
    try {
        let record: UserToEvent;
        record = await prisma.userToEvent.create({
            data: userToEvent,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateUserToEvent(
    id: number,
    updatedData: Partial<UserToEvent>
) {
    try {
        let record: UserToEvent;
        record = await prisma.userToEvent.update({
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

export async function deleteUserToEvent(id: number) {
    try {
        await prisma.userToEvent.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
