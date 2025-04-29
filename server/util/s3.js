import { S3Client } from "@aws-sdk/client-s3";


const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const token = process.env.AWS_SESSION_TOKEN;

if (!region || !accessKeyId || !secretAccessKey) {
    console.error("AWS configuration environment variables (AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are missing!");
}

const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        sessionToken: token,
    }
});

export default s3Client;
