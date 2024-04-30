import prisma from "@/prisma";

interface Message {
    id: number;
    userToFriendId: number;
    authorId: number;
    content: string;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getMessage(id: number) {
    try {
        let record: Message;
        record = await prisma.message.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMessages() {
    try {
        let records: Message[];
        records = await prisma.message.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createMessage(message: Message) {
    try {
        let record: Message;
        record = await prisma.message.create({
            data: message,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateMessage(id: number, updatedData: Partial<Message>) {
    try {
        let record: Message;
        record = await prisma.message.update({
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

export async function deleteMessage(id: number) {
    try {
        await prisma.message.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
