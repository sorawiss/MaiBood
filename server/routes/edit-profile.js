import express from 'express';
import pool from '../util/db.js';
import AuthMiddleware from '../util/AuthMiddleware.js';
// import { uploadToS3 } from './imageUpload.js';
import upload from '../util/multer.js';
// import deleteFromS3 from '../util/deleteS3.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Helper function to delete old image file
async function deleteOldImage(imageUrl) {
    if (!imageUrl) return;
    
    try {
        // Extract filename from URL
        const filename = path.basename(imageUrl);
        const filepath = path.join('uploads', filename);
        
        // Check if file exists before deleting
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`Deleted old image: ${filename}`);
        }
    } catch (error) {
        console.error('Error deleting old image:', error);
    }
}

// Update profile endpoint
router.patch('/api/edit-profile', AuthMiddleware, upload.single('pic'), async (req, res) => {
    console.log('Full request body:', req.body);
    console.log('File:', req.file);
    
    const { fname, lname, zip_code, address, line, ig } = req.body;
    const pic = req.file;
    const userId = req.userID;
    let imageUrl;
    let connection;
    
    try {
        connection = await pool.getConnection();
        
        // First, get the current user data to check for existing image
        const [currentUser] = await connection.execute(
            'SELECT pic FROM members WHERE id = ?',
            [userId]
        );
        
        if (currentUser.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Handle image upload if present
        if (pic) {
            try {
                // Delete old image if it exists
                const oldImageUrl = currentUser[0].pic;
                if (oldImageUrl) {
                    // await deleteFromS3(oldImageUrl);
                    await deleteOldImage(oldImageUrl);
                }

                // Upload new image
                // imageUrl = await uploadToS3(pic);
                imageUrl = `/uploads/${pic.filename}`;
            } catch (uploadError) {
                console.error('Error handling image:', uploadError);
                return res.status(500).json({ message: 'Error handling image upload/deletion' });
            }
        }
        
        // Build the update query dynamically
        let updateFields = [];
        let queryParams = [];
        
        if (fname !== undefined) {
            updateFields.push('fname = ?');
            queryParams.push(fname);
        }
        
        if (lname !== undefined) {
            updateFields.push('lname = ?');
            queryParams.push(lname);
        }
        
        if (zip_code !== undefined) {
            updateFields.push('zip_code = ?');
            queryParams.push(zip_code);
        }
        
        if (address !== undefined) {
            updateFields.push('address = ?');
            queryParams.push(address);
        }

        if (line !== undefined) {
            updateFields.push('line = ?');
            queryParams.push(line);
        }

        if (ig !== undefined) {
            updateFields.push('ig = ?');
            queryParams.push(ig);
        }

        if (imageUrl) {
            updateFields.push('pic = ?');
            queryParams.push(imageUrl);
        }
        
        // If no fields to update
        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        
        // Add userId to params
        queryParams.push(userId);
        
        // Execute the update
        await connection.execute(
            `UPDATE members SET ${updateFields.join(', ')} WHERE id = ?`,
            queryParams
        );
        
        connection.release();

        return res.status(200).json({
            message: 'Profile updated successfully',
            ...(imageUrl && { pic: imageUrl })
        });
        
    } catch (error) {
        console.error('Error updating profile:', error);
        if (connection) {
            connection.release();
        }
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

export default router;

