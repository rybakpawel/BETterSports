import { Gender } from "@prisma/client";
import prisma from "@/prisma";

export interface Person {
    id: number;
    name: string;
    lastName: string;
    birthDate: string;
    gender: string;
    nationalityId: number;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export interface PersonKey {
    id?: number;
    name?: string;
    lastName?: string;
    birthDate?: Date;
    gender?: string;
    nationality?: number;
    athlete?: number;
    team?: number;
    createdAt?: Date;
    createdBy?: number;
    updatedAt?: Date;
    updatedBy?: number;
}

export interface IPersonUpdate {
    id: number;
    name?: string;
    lastName?: string;
    birthDate?: Date;
    gender?: Gender;
    nationalityId?: number | null;
    athleteId?: number | null;
    teamId?: number | null;
    createdAt: Date;
    createdById: number | null;
    updatedAt: Date;
    updatedById: number | null;
}

// nigdzie nie używane, zrobione przez pomyłkę, zostawione na później do wykorzystania
export async function deletePerson(personId: number) {
    try {
        await prisma.person.delete({
            where: { id: personId },
        });

        console.log(
            `Rekord Person o ID ${personId} został usunięty, a powiązane pola w User ustawione na NULL.`
        );
    } catch (error) {
        console.error(error);
    }
}
