import express from 'express'
import AuthMiddleware from '../util/AuthMiddleware.js'
import upload from '../util/multer.js'
import prisma from '../util/prisma.js'
import { deleteOldImage } from '../util/imageUtils.js'

const router = express.Router()

// Add to fridge
router.post('/api/add-to-fridge', AuthMiddleware, upload.single('image'), async (req, res) => {
    const { owner, material, exp } = req.body;
    if (!owner || !material || !exp) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Get image URL if file was uploaded
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        await prisma.fridge.create({
            data: {
                owner: parseInt(owner),
                material,
                exp: new Date(exp),
                is_store: 0,
                image: imageUrl
            }
        });

        res.status(201).json({
            message: 'Item added to fridge'
        });
    }
    catch (error) {
        console.error('Error adding item to fridge:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Delete from fridge
router.delete('/api/delete-from-fridge/:id', AuthMiddleware, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Missing required field: id' });
    }

    try {
        const item = await prisma.fridge.findUnique({
            where: { id: parseInt(id) }
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete image from server if it exists
        if (item.image) {
            await deleteOldImage(item.image);
        }

        // Change status based on current state
        let status;
        switch (item.is_store) {
            case 0:
                status = 2; // Eat
                break;
            case 1:
                if (item.exp < new Date()) {
                    status = 4; // Expired
                } else {
                    status = 3; // Give
                }
                break;
        }

        await prisma.fridge.update({
            where: { id: parseInt(id) },
            data: { is_store: status }
        });

        res.status(200).json({
            message: 'Item deleted from fridge successfully.'
        });
    }
    catch (error) {
        console.error('Error deleting item from fridge', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Get from fridge
router.get('/api/fridge/:ownerId', AuthMiddleware, async (req, res) => {
    const { ownerId } = req.params;
    console.log('debug1 start ');

    try {
        const items = await prisma.fridge.findMany({
            where: {
                owner: parseInt(ownerId),
                is_store: {
                    in: [0, 1] // Only get items that are in fridge (0) or in store (1)
                }
            },
            select: {
                id: true,
                material: true,
                exp: true,
                is_store: true
            },
            orderBy: {
                exp: 'asc'
            }
        });

        console.log(`Found ${items.length} items for owner ${ownerId}.`);

        res.status(200).json(items);
    }
    catch (error) {
        console.error(`Error fetching fridge items for owner ${ownerId}:`, error);
        res.status(500).json({ message: 'Internal server error while fetching fridge items', error: error.message });
    }
});

export default router;