import express from 'express'
import prisma from '../util/prisma.js'

const router = express.Router()

// Get All Foods
router.get('/api/get-food', async (req, res) => {
    const { zip_code, limit } = req.query;

    try {
        const whereClause = {
            is_store: 1,
            exp: {
                gt: new Date()
            }
        };

        if (zip_code) {
            whereClause.member = {
                zip_code: zip_code
            };
        }

        const foods = await prisma.fridge.findMany({
            where: whereClause,
            include: {
                member: {
                    select: {
                        zip_code: true,
                        address: true
                    }
                }
            },
            orderBy: {
                exp: 'asc'
            },
            take: limit ? parseInt(limit) : undefined
        });

        // Transform the result to match the previous format
        const transformedFoods = foods.map(food => ({
            ...food,
            zip_code: food.member.zip_code,
            address: food.member.address
        }));

        res.json(transformedFoods);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Get Inpost Food
router.get('/api/get-inpost/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const food = await prisma.fridge.findFirst({
            where: {
                id: parseInt(id),
                is_store: 1
            },
            include: {
                member: {
                    select: {
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
                }
            }
        });

        if (!food) {
            console.log(`No item found with ID ${id} or it's not marked as 'is_store=true'.`);
            return res.status(404).json({ message: 'Food item not found or not available in store' });
        }

        // Transform the result to match the previous format
        const transformedFood = {
            ...food,
            fname: food.member.fname,
            lname: food.member.lname,
            address: food.member.address,
            subdistrict: food.member.subdistrict,
            district: food.member.district,
            province: food.member.province,
            zip_code: food.member.zip_code,
            ig: food.member.ig,
            line: food.member.line,
            pic: food.member.pic
        };

        res.json(transformedFood);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

export default router;