import express from 'express'
import pool from '../util/db.js';
import AuthMiddleware from '../util/AuthMiddleware.js';
// import deleteFromS3 from '../util/deleteS3.js';
// import { uploadToS3 } from './imageUpload.js'
import upload from '../util/multer.js';
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

// Add to fridge
router.post('/api/add-to-fridge', AuthMiddleware, upload.single('image'), async (req, res) => {
    const { owner, material, exp } = req.body;
    if (!owner || !material || !exp) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let connection;
    try {
        // Get image URL if file was uploaded
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        connection = await pool.getConnection();
        await connection.execute(
            'INSERT INTO fridge (owner, material, exp, is_store, image) VALUES (?, ?, ?, ?, ?)',
            [owner, material, exp, 0, imageUrl]
        )
        res.status(201).json({
            message: 'Item added to fridge'
        })
    }
    catch (error) {
        console.error('Error adding item to fridge:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
                console.log("Database connection released for add-to-fridge.");
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})

// Delete from fridge
router.delete('/api/delete-from-fridge/:id', AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing required field: id' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const [rows] = await connection.execute(
            'SELECT image, is_store, exp FROM fridge WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete image from server if it exists
        const imageUrl = rows[0].image;
        if (imageUrl) {
            await deleteOldImage(imageUrl);
        }

        // Change status from db
        let status;
        switch (rows[0].is_store) {
            case 0:
                status = 2; // Eat
                break;
            case 1:
                if (rows[0].exp < new Date()) {
                    status = 4; // Expired
                } else {
                    status = 3; // Give
                }
                break;
        }

        await connection.execute(
            'UPDATE fridge SET is_store = ? WHERE id = ?',
            [status, id]
        );

        res.status(200).json({
            message: 'Item deleted from fridge successfully.'
        });
    }
    catch (error) {
        console.error('Error deleting item from fridge', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
                console.log(`Database connection released for fetching fridge items `);
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})

// Get from fridge
router.get('/api/fridge/:ownerId', AuthMiddleware, async (req, res) => {
    const { ownerId } = req.params;
    console.log('debug1 start ')

    let connection;
    try {
        connection = await pool.getConnection();
        console.log(`Database connection acquired for fetching fridge items for owner: ${ownerId}`);

        const [items] = await connection.execute(
            'SELECT id, material, exp, is_store FROM fridge WHERE owner = ? AND (is_store = 0 OR is_store = 1) ORDER BY exp ASC',
            [ownerId]
        );

        console.log(`Found ${items.length} items for owner ${ownerId}.`);

        res.status(200).json(items);
    }
    catch (error) {
        console.error(`Error fetching fridge items for owner ${ownerId}:`, error);
        res.status(500).json({ message: 'Internal server error while fetching fridge items', error: error.message });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
                console.log(`Database connection released for fetching fridge items for owner: ${ownerId}`);
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})

export default router;