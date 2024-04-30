import prisma from "@/prisma";

interface City {
    id: number;
    name: string;
    countryId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getCity(id: number) {
    try {
        let record: City;
        record = await prisma.city.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllCities() {
    try {
        let records: City[];
        records = await prisma.city.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createCity(city: City) {
    try {
        let record: City;
        record = await prisma.city.create({
            data: city,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateCity(id: number, updatedData: Partial<City>) {
    try {
        let record: City;
        record = await prisma.city.update({
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

export async function deleteCity(id: number) {
    try {
        await prisma.city.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
