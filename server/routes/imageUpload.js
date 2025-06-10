import express from 'express'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import upload from '../util/multer.js';
import s3Client from '../util/s3.js';
import prisma from '../util/prisma.js';
import AuthMiddleware from '../util/AuthMiddleware.js';
import { deleteOldImage } from '../util/imageUtils.js';

const router = express.Router();

// S3 upload function
export async function uploadToS3(file) {
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

// API Endpoint for food images
router.post('/api/upload', AuthMiddleware, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided or file type is invalid.' });
    }

    const { owner, material, exp, type, id } = req.body;

    console.log('File received:', req.file.originalname, req.file.mimetype, req.file.size);

    try {
        // Upload to S3 instead of local storage
        const imageUrl = await uploadToS3(req.file);

        if (id) {
            // Get current item to check for existing image
            const currentItem = await prisma.fridge.findUnique({
                where: { id: parseInt(id) },
                select: { image: true }
            });

            // Delete old image if it exists
            if (currentItem?.image) {
                await deleteOldImage(currentItem.image);
            }

            // Update existing item
            await prisma.fridge.update({
                where: { id: parseInt(id) },
                data: {
                    image: imageUrl,
                    type: type,
                    material: material,
                    is_store: 1
                }
            });

            return res.status(200).json({
                message: 'Data Update Successfully',
                imageUrl
            });
        } else {
            // Create new item
            await prisma.fridge.create({
                data: {
                    owner: parseInt(owner),
                    material,
                    exp: new Date(exp),
                    is_store: 1,
                    image: imageUrl,
                    type
                }
            });

            return res.status(200).json({
                message: 'Data Upload Successfully',
                imageUrl
            });
        }
    }
    catch (error) {
        console.error('Error during upload process:', error);
        res.status(500).json({ 
            message: 'Server error during image upload.', 
            error: error.message 
        });
    }
});

// Profile Avatar Upload Endpoint
router.post('/api/profile-image', AuthMiddleware, upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided or file type is invalid.' });
    }

    try {
        // Upload to S3 instead of local storage
        const imageUrl = await uploadToS3(req.file);

        // Get current user to check for existing image
        const currentUser = await prisma.member.findUnique({
            where: { id: req.userId },
            select: { pic: true }
        });

        // Delete old image if it exists
        if (currentUser?.pic) {
            await deleteOldImage(currentUser.pic);
        }

        // Update user's avatar in the database
        await prisma.member.update({
            where: { id: req.userId },
            data: { pic: imageUrl }
        });

        return res.status(200).json({
            message: 'Profile image updated successfully',
            avatarUrl: imageUrl
        });
    } catch (error) {
        console.error('Error during profile image upload:', error);
        res.status(500).json({ 
            message: 'Failed to upload profile image', 
            error: error.message 
        });
    }
});

export default router;