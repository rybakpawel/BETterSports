import prisma from "@/prisma";

interface Location {
    id: number;
    cityId: number;
    street: string;
    number: string;
    zipCode: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getLocation(id: number) {
    try {
        let record: Location;
        record = await prisma.location.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllLocations() {
    try {
        let records: Location[];
        records = await prisma.location.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createLocation(location: Location) {
    try {
        let record: Location;
        record = await prisma.location.create({
            data: location,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateLocation(
    id: number,
    updatedData: Partial<Location>
) {
    try {
        let record: Location;
        record = await prisma.location.update({
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

export async function deleteLocation(id: number) {
    try {
        await prisma.location.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
