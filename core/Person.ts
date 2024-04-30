import prisma from "@/prisma";

export interface Person {
    id: bigint;
    name: string;
    lastName: string;
    birthDate: string;
    nationalityId: bigint;
    createdAt: Date;
    createdById: bigint;
    updatedAt: Date;
    updatedById: bigint;
}

export interface PersonKey {
    id?: bigint;
    name?: string;
    lastName?: string;
    birthDate?: Date;
    nationality?: bigint;
    athlete?: bigint;
    team?: bigint;
    createdAt?: Date;
    createdBy?: bigint;
    updatedAt?: Date;
    updatedBy?: bigint;
}

export async function getPerson(id: number) {
    try {
        const record = await prisma.person.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPerson() {
    try {
        const records = await prisma.person.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createPerson(
    person: Partial<Person>
): Promise<Person | undefined> {
    try {
        const record = await prisma.person.create({
            data: person,
        });

        return record;
    } catch (error) {
        console.error(error);
    }
}

export async function updatePerson(id: number, updatedData: Partial<Person>) {
    try {
        const record = await prisma.person.update({
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

export async function deletePerson(id: number) {
    try {
        await prisma.person.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
