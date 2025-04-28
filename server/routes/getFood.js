import express from 'express'

import pool from '../util/db.js';

const router = express.Router();


router.get('/get-food', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query('SELECT * FROM fridge WHERE is_store = true');
        res.json(result);

    }
    catch (error) {
        res.status(500).json({message: 'Internal server error', error: error.message });
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