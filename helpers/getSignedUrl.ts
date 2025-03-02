"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const acceptedTypes = ["image/jpg", "image/jpeg", "image/png"];
const maxFileSize = 1024 * 1024 * 10;

const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

export async function getSignedURL(
    type: string,
    size: number,
    checksum: string
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return { failure: "Użytkonik nie jest zalogowany" };
    }

    const name = generateFileName();

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: name,
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: session.user.id,
        },
    });

    if (!acceptedTypes.includes(type)) {
        return { failure: "Nieprawidłowy typ pliku" };
    }

    if (size > maxFileSize) {
        return { failure: "Zbyt duży rozmiar pliku" };
    }

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60,
    });

    return { success: { name, url: signedUrl } };
}
