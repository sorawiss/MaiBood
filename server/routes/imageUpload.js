import express from 'express'
import { PutObjectCommand } from "@aws-sdk/client-s3";

import upload from '../util/multer.js';
import s3Client from '../util/s3.js';
import pool from '../util/db.js';


const router = express.Router();


async function uploadToS3(file) {
    const bucketName = process.env.S3_BUCKET_NAME;
    if (!bucketName) {
        console.log("AWS_BUCKET_NAME environment variable is not set.");
        throw new Error("AWS_BUCKET_NAME environment variable is not set.");
    }

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);


        const fileURL = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
        return fileURL;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}


// API Endpoint
router.post('/image/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided or file type is invalid.' });
    }

    const { owner, material, exp, type, id } = req.body;
    const price = parseInt(req.body.price);


    console.log('File received:', req.file.originalname, req.file.mimetype, req.file.size);

    try {
        const s3Response = await uploadToS3(req.file);
        const imageUrl = s3Response;

        let connection;
        connection = await pool.getConnection();

        if (id) {
            await connection.execute(
                'UPDATE fridge SET image = ?, price = ?, type = ?, material = ?, is_store = ? WHERE id = ?',
                [imageUrl, price, type, material, true, id]
            )

            return res.status(200).json({
                message: 'Data Update Successfully'
            });
        }
        else {
            await connection.execute(
                'INSERT INTO fridge (owner, material, exp, is_store, image, price, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [owner, material, exp, true, imageUrl, price, type]
            )

            return res.status(200).json({
                message: 'Data Upload Successfully'
            });
        }

    }
    catch (error) {
        console.error('Error during upload process:', error);
        if (error.code) {
            res.status(500).json({ message: 'Failed to upload image to storage.', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error during image upload.', error: error.message });
        }
    }
});



export default router;