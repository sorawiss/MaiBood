import express from 'express'

import pool from '../util/db.js';
import AuthMiddleware from '../util/AuthMiddleware.js';
import deleteFromS3 from '../util/deleteS3.js';


const router = express.Router();


// Add to fridge
router.post('/add-to-fridge', AuthMiddleware, async (req, res) => {
    const { owner, material, exp } = req.body;
    if (!owner || !material || !exp) {
        return res.status(400).json({ message: 'Missing required fields: id, material, or exp' });
    }


    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO fridge (owner, material, exp, is_store) VALUES (?, ?, ?, ?)',
            [owner, material, exp, false]
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
router.delete('/delete-from-fridge/:id', AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing required field: id' });
    }


    let connection;
    try {
        connection = await pool.getConnection();

        const [rows] = await connection.execute(
            'SELECT image FROM fridge WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const imageUrl = rows[0].image;

        // if (imageUrl) {
        //     await deleteFromS3(imageUrl);
        // }


        await connection.execute(
            'DELETE FROM fridge WHERE id = ?',
            [id]
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
router.get('/fridge/:ownerId', AuthMiddleware, async (req, res) => {
    const { ownerId } = req.params;
    console.log('debug1 start ')


    let connection;
    try {
        connection = await pool.getConnection();
        console.log(`Database connection acquired for fetching fridge items for owner: ${ownerId}`);

        const [items] = await connection.execute(
            'SELECT id, material, exp, is_store FROM fridge WHERE owner = ? ORDER BY exp ASC',
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