import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from './s3.js';

// No longer supports local file deletion. Only deletes images from S3.
export async function deleteOldImage(imageUrl) {
    if (!imageUrl) return;
    try {
        // Only handle S3 images
        if (imageUrl.startsWith('http') && imageUrl.includes('.amazonaws.com/')) {
            const bucketName = process.env.S3_BUCKET_NAME;
            // Extract the key from the URL
            const url = new URL(imageUrl);
            // S3 URL format: https://{bucket}.s3.{region}.amazonaws.com/{key}
            const key = url.pathname.slice(1); // remove leading '/'
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
        } else {
            // Local deletion is no longer supported
            console.log('Local image deletion is disabled. Only S3 images are deleted.');
        }
    } catch (error) {
        console.error('Error deleting old image:', error);
    }
} 