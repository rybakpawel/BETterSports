import prisma from "@/prisma";

interface UserToFriend {
    id: number;
    invitingUserId: number;
    recipentUserId: number;
    openInvitation: boolean;
    invitationAccepted: boolean;
    createdAt: Date;
    createdById: number;
    updatedAt: Date;
    updatedById: number;
}

export async function getUserToFriend(id: number) {
    try {
        let record: UserToFriend;
        record = await prisma.userToFriend.findUnique({
            where: {
                id,
            },
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function getAllUsersToFriends() {
    try {
        let records: UserToFriend[];
        records = await prisma.userToFriend.findMany({});

        return { records };
    } catch (error) {
        console.error(error);
    }
}

export async function createUserToFriend(userToFriend: UserToFriend) {
    try {
        let record: UserToFriend;
        record = await prisma.userToFriend.create({
            data: userToFriend,
        });

        return { record };
    } catch (error) {
        console.error(error);
    }
}

export async function updateUserToFriend(
    id: number,
    updatedData: Partial<UserToFriend>
) {
    try {
        let record: UserToFriend;
        record = await prisma.userToFriend.update({
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

export async function deleteUserToFriend(id: number) {
    try {
        await prisma.userToFriend.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
    }
}
