import { Gender } from "@prisma/client";

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
