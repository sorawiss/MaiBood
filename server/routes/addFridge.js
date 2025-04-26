import express from 'express'

import pool from '../util/db.js';


const router = express.Router();


router.post('/add-to-fridge', async (req, res) => {
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




export default router;