import express from 'express';
import AuthMiddleware from '../util/AuthMiddleware.js';
import upload from '../util/multer.js';
import prisma from '../util/prisma.js';
import { deleteOldImage } from '../util/imageUtils.js';
import { uploadToS3 } from './imageUpload.js';

const router = express.Router();

router.patch('/api/edit-profile', AuthMiddleware, upload.single('pic'), async (req, res) => {
    const userId = req.userID;
    const { fname, lname, zip_code, address, district, province, subdistrict, line, ig } = req.body;
    let imageUrl = null;

    try {
        // Handle image upload if present
        if (req.file) {
            // Get current user to check for existing image
            const currentUser = await prisma.member.findUnique({
                where: { id: userId },
                select: { pic: true }
            });

            // Delete old image if it exists
            if (currentUser?.pic) {
                await deleteOldImage(currentUser.pic);
            }

            // Upload to S3 instead of local storage
            imageUrl = await uploadToS3(req.file);
        }

        // Prepare update data
        const updateData = {};
        if (fname !== undefined) updateData.fname = fname;
        if (lname !== undefined) updateData.lname = lname;
        if (zip_code !== undefined) updateData.zip_code = zip_code;
        if (address !== undefined) updateData.address = address;
        if (district !== undefined) updateData.district = district;
        if (province !== undefined) updateData.province = province;
        if (subdistrict !== undefined) updateData.subdistrict = subdistrict;
        if (line !== undefined) updateData.line = line;
        if (ig !== undefined) updateData.ig = ig;
        if (imageUrl) updateData.pic = imageUrl;

        // If no fields to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        // Update user profile
        const updatedUser = await prisma.member.update({
            where: { id: userId },
            data: updateData
        });

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
});

export default router;

