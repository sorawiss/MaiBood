import express from 'express';
import pool from '../util/db.js';
import AuthMiddleware from '../util/AuthMiddleware.js';

const router = express.Router();


// Update profile endpoint
router.patch('/api/edit-profile', AuthMiddleware, async (req, res) => {
    const { fname, lname, zip_code, address, line, ig } = req.body;
    const userId = req.userID;

    let connection;
    try {
        connection = await pool.getConnection();
        
        // First, get the current user data
        const [currentUser] = await connection.execute(
            'SELECT * FROM members WHERE id = ?',
            [userId]
        );
        
        if (currentUser.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        
        // Build the update query dynamically
        let updateFields = [];
        let queryParams = [];
        
        if (fname) {
            updateFields.push('fname = ?');
            queryParams.push(fname);
        }
        
        if (lname) {
            updateFields.push('lname = ?');
            queryParams.push(lname);
        }
        
        if (zip_code) {
            updateFields.push('zip_code = ?');
            queryParams.push(zip_code);
        }
        
        if (address) {
            updateFields.push('address = ?');
            queryParams.push(address);
        }

        if (line) {
            updateFields.push('line = ?');
            queryParams.push(line);
        }

        if (ig) {
            updateFields.push('ig = ?');
            queryParams.push(ig);
        }
        
        // If no fields to update
        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        
        // Add userId to params
        queryParams.push(userId);
        
        // Execute the update
        const [result] = await connection.execute(
            `UPDATE members SET ${updateFields.join(', ')} WHERE id = ?`,
            queryParams
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        
        // Get updated user data to return (excluding password)
        const [updatedUser] = await connection.execute(
            'SELECT id, fname, lname, phone_number, zip_code, address, line, ig FROM members WHERE id = ?',
            [userId]
        );
        
        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser[0]
        });
        
    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ message: 'Internal server error during profile update' });
    } finally {
        if (connection) {
            try {
                await connection.release();
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
});

export default router;
