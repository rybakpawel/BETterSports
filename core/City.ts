import prisma from "@/prisma";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

export interface ICity {
    id: number;
    name: string;
    country: number | connect;
    createdAt: Date;
    createdBy: number | connect;
    updatedAt: Date;
    updatedBy: number | connect;
}

type connect = {
    connect: {
        id: number;
    };
};

// 1 usage
export async function getCitiesByInput(input: string) {
    try {
        const records = await prisma.city.findMany({
            where: {
                name: {
                    startsWith: input,
                    mode: "insensitive",
                },
            },
            orderBy: { name: "asc" },
        });

        return records;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas pobierania miasta na podstawie formularza"
        );
    }
}

// 1 usage
export async function createCity(city: Partial<ICity>) {
    try {
        const record = await prisma.city.create({
            data: city,
        });

        return { record };
    } catch (error) {
        throw new CoreError("Wystąpił błąd podczas tworzenia miasta");
    }
}

export async function checkExistingCityInCountry(
    cityName: string,
    countryId: number
) {
    try {
        const record = await prisma.city.findFirst({
            where: {
                name: cityName,
                country: {
                    id: countryId,
                },
            },
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas wyszukiwania miasta na podstawie kraju"
        );
    }
}
