import express from 'express'

import pool from '../util/db.js';

const router = express.Router();


// Get All Foods
router.get('/api/get-food', async (req, res) => {
    const { zip_code, limit } = req.query;
    let connection;
    try {
        connection = await pool.getConnection();
        let query = `
            SELECT f.*, m.zip_code, m.address
            FROM fridge f 
            INNER JOIN members m ON f.owner = m.id 
            WHERE f.is_store = true 
        `;
        let params = [];

        if (zip_code) {
            query += ' AND m.zip_code = ?';
            params.push(zip_code);
        }

        query += ' ORDER BY f.exp ASC';
        
        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));
        }
        
        const [result] = await connection.query(query, params);
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
            'SELECT f.id, f.owner, f.material, f.exp, f.is_store, f.image, f.price, f.type, m.fname, m.lname, m.address, m.ig, m.line FROM fridge f INNER JOIN members m ON f.owner = m.id WHERE f.is_store = true AND f.id = ?', [id]);

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