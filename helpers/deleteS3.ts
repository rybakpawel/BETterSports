"use server";

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function deleteS3Image(url: string) {
    try {
        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: url.split("/").pop(),
        });

        await s3.send(deleteObjectCommand);

        console.log("Usunięto plik z serwera S3");
    } catch (error) {
        console.error("Nie udało się usunąć pliku z serwera S3", error);
    }
}
