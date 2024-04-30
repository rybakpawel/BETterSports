import prisma from "@/prisma";

interface Market {
    id: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getMarket(id: number) {
    try {
        let record: Market;
        record = await prisma.market.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMarkets() {
    try {
        let records: Market[];
        records = await prisma.market.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createMarket(market: Market) {
    try {
        let record: Market;
        record = await prisma.market.create({
            data: market,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateMarket(id: number, updatedData: Partial<Market>) {
    try {
        let record: Market;
        record = await prisma.market.update({
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

export async function deleteMarket(id: number) {
    try {
        await prisma.market.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
