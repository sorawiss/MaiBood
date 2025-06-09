import express from 'express';
import prisma from '../util/prisma.js';

const router = express.Router();

router.get('/api/get-profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.member.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                fname: true,
                lname: true,
                address: true,
                subdistrict: true,
                district: true,
                province: true,
                zip_code: true,
                ig: true,
                line: true,
                pic: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
        
