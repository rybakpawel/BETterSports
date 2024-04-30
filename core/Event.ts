import prisma from "@/prisma";

interface Event {
    id: number;
    date: Date;
    facilityId: number;
    team1Id: number;
    team2Id: number;
    result: string;
    attendance: number;
    sportId: number;
    winnerId: number;
    isDerby: boolean;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getEvent(id: number) {
    try {
        let record: Event;
        record = await prisma.event.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllEvents() {
    try {
        let records: Event[];
        records = await prisma.event.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createEvent(event: Event) {
    try {
        let record: Event;
        record = await prisma.event.create({
            data: event,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateEvent(id: number, updatedData: Partial<Event>) {
    try {
        let record: Event;
        record = await prisma.event.update({
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

export async function deleteEvent(id: number) {
    try {
        await prisma.event.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
