import prisma from "@/prisma";

interface Facility {
    id: number;
    capacity: number;
    locationId: number;
    name: string;
    buildYear: number;
    coordinates: string;
    description: string;
    standsId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getFacility(id: number) {
    try {
        let record: Facility;
        record = await prisma.facility.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllFacilities() {
    try {
        let records: Facility[];
        records = await prisma.facility.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createFacility(facility: Facility) {
    try {
        let record: Facility;
        record = await prisma.facility.create({
            data: facility,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateFacility(
    id: number,
    updatedData: Partial<Facility>
) {
    try {
        let record: Facility;
        record = await prisma.facility.update({
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

export async function deleteFacility(id: number) {
    try {
        await prisma.facility.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
