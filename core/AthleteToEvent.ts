import prisma from "@/prisma";

interface AthleteToEvent {
    id: number;
    athleteId: number;
    eventId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getAthleteToEvent(id: number) {
    try {
        let record: AthleteToEvent;
        record = await prisma.athleteToEvent.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllAthletesToEvents() {
    try {
        let records: AthleteToEvent[];
        records = await prisma.athleteToEvent.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createAthleteToEvent(athleteToEvent: AthleteToEvent) {
    try {
        let record: AthleteToEvent;
        record = await prisma.athleteToEvent.create({
            data: athleteToEvent,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateAthleteToEvent(
    id: number,
    updatedData: Partial<AthleteToEvent>
) {
    try {
        let record: AthleteToEvent;
        record = await prisma.athleteToEvent.update({
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

export async function deleteAthleteToEvent(id: number) {
    try {
        await prisma.athleteToEvent.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
