import express from 'express'
import AuthMiddleware from '../util/AuthMiddleware.js'
import prisma from '../util/prisma.js'

const router = express.Router()

// Get All History
router.get('/api/history/:id', AuthMiddleware, async (req, res) => {
    try {
        const userID = String(req.params.id)
        const id = String(req.userID)

        console.log(userID)
        console.log(id)

        const [history, stats] = await Promise.all([
            // Get history items
            prisma.fridge.findMany({
                where: {
                    owner: parseInt(userID),
                    is_store: {
                        in: [2, 3, 4] // 2: eaten, 3: given, 4: expired
                    }
                },
                orderBy: {
                    exp: 'desc'
                }
            }),
            // Get statistics
            prisma.fridge.groupBy({
                by: ['is_store'],
                where: {
                    owner: parseInt(userID),
                    is_store: {
                        in: [2, 3, 4]
                    }
                },
                _count: {
                    _all: true
                }
            })
        ]);

        // Transform stats into the expected format
        const statsMap = stats.reduce((acc, curr) => {
            acc[curr.is_store] = curr._count._all;
            return acc;
        }, {});

        const statsResult = {
            givenCount: statsMap[3] || 0,
            expiredCount: statsMap[4] || 0,
            eatCount: statsMap[2] || 0
        };

        if (id !== userID) {
            return res.status(200).json(statsResult);
        }

        res.status(200).json({
            history,
            ...statsResult
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;