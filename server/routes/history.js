import express from 'express'

import AuthMiddleware from '../util/AuthMiddleware.js'
import pool from '../util/db.js'


const router = express.Router()


router.get('/api/history', AuthMiddleware, async (req, res) => {
    try {
        const userID = req.userID

        const [rows] = await pool.query('SELECT * FROM fridge WHERE owner = ? AND (is_store = 2 OR is_store = 3)', [userID])

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router