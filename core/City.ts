import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
import { CoreError } from "@/helpers/errorAndResponseHandlers";

type TransactionClient = Omit<
    typeof prisma,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export async function createCity(
    city: Prisma.CityCreateInput,
    tx?: TransactionClient
) {
    try {
        const client = tx || prisma;
        const record = await client.city.create({
            data: city,
        });

        return record;
    } catch (error) {
        throw new CoreError(
            "Wystąpił błąd podczas tworzenia miasta",
            error as string
        );
    }
}

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
            "Wystąpił błąd podczas pobierania miasta na podstawie formularza",
            error as string
        );
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
            "Wystąpił błąd podczas wyszukiwania miasta na podstawie kraju",
            error as string
        );
    }
}
