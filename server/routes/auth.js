import express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../util/prisma.js';

const router = express.Router();

// Constraint
const SALTROUNDS = 10;
const SECRET_KEY = process.env.TOKEN;
if (!SECRET_KEY) {
    console.error("FATAL ERROR: TOKEN environment variable is not set.");
}

// Utility function 
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '7d' });
};

// Register
router.post('/api/register', async (req, res) => {
    const { fname, lname, phone_number, password, zip_code, address, district, province, subdistrict } = req.body;

    if (!fname || !lname || !phone_number || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check exist user
        const existingUser = await prisma.member.findUnique({
            where: { phone_number }
        });

        if (existingUser) {
            console.log('User with this phone number already exists')
            return res.status(409).json({ message: 'User with this phone number already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        const newUser = await prisma.member.create({
            data: {
                fname,
                lname,
                phone_number,
                password: hashedPassword,
                zip_code,
                address,
                district,
                province,
                subdistrict
            }
        });

        // Generate JWT
        const token = generateToken(newUser.id);
        // Set the cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const userDataToSend = {
            id: newUser.id,
            fname: newUser.fname,
            lname: newUser.lname,
            phone_number: newUser.phone_number,
            address: newUser.address,
            zip_code: newUser.zip_code,
        };

        return res.status(201).json(userDataToSend);
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error during registration' });
    }
});

// Login
router.post('/api/login', async (req, res) => {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
        return res.status(400).json({ message: 'Please provide phone_number and password' });
    }

    try {
        const user = await prisma.member.findUnique({
            where: { phone_number }
        });

        if (!user) {
            console.log('No user found')
            return res.status(401).json({ message: 'Invalid phone number' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { password: passwordHash, ...rest } = user;

        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        return res.status(200).json({
            message: 'Login successful',
            ...rest
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
});

// auth
router.get('/api/authentication', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const userId = decoded.userId;
        if (!userId) {
            console.warn('Token verified but missing userId payload:', decoded);
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        const user = await prisma.member.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fname: true,
                lname: true,
                zip_code: true,
                phone_number: true,
                address: true,
                line: true,
                ig: true,
                pic: true,
                district: true,
                province: true,
                subdistrict: true
            }
        });

        if (!user) {
            console.warn('User ID from valid token not found in DB:', userId);
            res.clearCookie('token');
            return res.status(401).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        res.sendStatus(403);
    }
});

// Logout
router.post('/api/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });
    res.json({ message: 'Logged out' });
});

export default router;