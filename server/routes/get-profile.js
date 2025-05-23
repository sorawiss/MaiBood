import express from 'express';
import pool from '../util/db.js';

const router = express.Router();

router.get('/api/get-profile/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const [result] = await pool.query(`
            SELECT 
                id,
                fname,
                lname,
                address,
                subdistrict,
                district,
                province,
                zip_code,
                ig,
                line,
                pic 
            FROM members 
            WHERE id = ?
        `, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(result[0]);

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
        
