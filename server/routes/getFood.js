import express from 'express'

import pool from '../util/db.js';

const router = express.Router();


// Get All Foods
router.get('/api/get-food', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query('SELECT * FROM fridge WHERE is_store = true ORDER BY exp ASC ');
        res.json(result);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})


// Get Inpost Food
router.get('/api/get-inpost/:id', async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
            'SELECT f.id, f.owner, f.material, f.exp, f.is_store, f.image, f.price, f.type, m.fname, m.lname FROM fridge f INNER JOIN members m ON f.owner = m.id WHERE f.is_store = true AND f.id = ?', [id]);

        if (result.length === 0) {
            console.log(`No item found with ID ${id} or it's not marked as 'is_store=true'.`);
            return res.status(404).json({ message: 'Food item not found or not available in store' });
        }

        res.json(result[0]);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})


export default router;