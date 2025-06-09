/*
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from '../util/s3.js';

async function deleteFromS3(imageUrl) {
    const bucketName = process.env.S3_BUCKET_NAME;

    const urlParts = imageUrl.split('/');
    const key = urlParts.slice(3).join('/'); // Assumes url = https://{bucket}.s3.{region}.amazonaws.com/{key}

    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        console.log(`Deleted image from S3: ${key}`);
    } catch (error) {
        console.error('Error deleting image from S3:', error);
    }
}

export default deleteFromS3
*/