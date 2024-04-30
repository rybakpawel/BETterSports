import prisma from "@/prisma";

interface Country {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getCountry(id: number) {
    try {
        let record: Country;
        record = await prisma.country.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllCountries() {
    try {
        let records: Country[];
        records = await prisma.country.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createCountry(country: Country) {
    try {
        let record: Country;
        record = await prisma.country.create({
            data: country,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateCountry(id: number, updatedData: Partial<Country>) {
    try {
        let record: Country;
        record = await prisma.country.update({
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

export async function deleteCountry(id: number) {
    try {
        await prisma.country.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
