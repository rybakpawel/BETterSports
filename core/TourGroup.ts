import prisma from "@/prisma";

interface TourGroup {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getTourGroup(id: number) {
    try {
        let record: TourGroup;
        record = await prisma.tourGroup.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllTourGroups() {
    try {
        let records: TourGroup[];
        records = await prisma.tourGroup.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createTourGroup(tourGroup: TourGroup) {
    try {
        let record: TourGroup;
        record = await prisma.tourGroup.create({
            data: tourGroup,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateTourGroup(
    id: number,
    updatedData: Partial<TourGroup>
) {
    try {
        let record: TourGroup;
        record = await prisma.tourGroup.update({
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

export async function deleteTourGroup(id: number) {
    try {
        await prisma.tourGroup.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
