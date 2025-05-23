import express from 'express'
import pool from '../util/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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


    let connection;
    try {
        connection = await pool.getConnection();

        // Check exist user
        const [existingUsers] = await connection.execute(
            'SELECT id FROM members WHERE phone_number = ? LIMIT 1',
            [phone_number]
        );
        if (existingUsers.length > 0) {
            console.log('User with this email already exists')
            return res.status(409).json({ message: 'User with this email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        const [result] = await connection.execute(
            'INSERT INTO members (fname, lname, phone_number, zip_code, address, district, province, subdistrict, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [fname, lname, phone_number, zip_code, address, district, province, subdistrict, hashedPassword]
        );

        const newUserId = result.insertId; // Get the ID of the newly created user



        // Generate JWT
        const token = generateToken(newUserId); // Use your utility function
        // Set the cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const userDataToSend = {
            id: newUserId,
            fname: fname,
            lname: lname,
            phone_number: phone_number,
            address: address,
            zip_code: zip_code,
        };

        return res.status(201).json(userDataToSend);

    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error during registration' });
    }
    finally {
        if (connection) {
            try {
                await connection.release();
                console.log("Database connection released.")
            } catch (releaseError) {
                console.error('Error releasing database connection:', releaseError);
            }
        }
    }
})


// Login
router.post('/api/login', async (req, res) => {
    const { phone_number, password } = req.body;
    if (!phone_number || !password) {
        return res.status(400).json({ message: 'Please provide phone_number and password' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const [rows] = await connection.execute(
            'SELECT * FROM members WHERE phone_number = ?',
            [phone_number]
        );

        if (rows.length === 0) {
            console.log('No user found')
            return res.status(401).json({ message: 'Invalid phone number' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const { password: passwordHash, ...rest } = user;

        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({
            message: 'Login successful', rest
        });
    }
    catch (error) {
        console.error('Login error:', error);
    }
    finally {
        // --- This block is crucial ---
        if (connection) {
            try {
                await connection.release();
                // console.log("DB connection released in /login"); // Optional log
            } catch (releaseError) {
                console.error('Error releasing database connection in /login:', releaseError);
            }
        }
    }
})


// auth
router.get('/api/authentication', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    let connection;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const userId = decoded.userId;
        if (!userId) {
            console.warn('Token verified but missing userId payload:', decoded);
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token payload' });
        }


        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT id, fname, lname, zip_code, phone_number, address, line, ig, pic, district, province, subdistrict FROM members WHERE id = ? LIMIT 1',
            [userId]
        );

        if (rows.length === 0) {
            console.warn('User ID from valid token not found in DB:', userId);
            res.clearCookie('token');
            return res.status(401).json({ message: 'User not found' });
        }

        const rest = rows[0];

        return res.status(200).json(rest);


    } catch (err) {
        res.sendStatus(403);
    }
    finally {
        // --- This block is crucial ---
        if (connection) {
            try {
                await connection.release();
                // console.log("DB connection released in /authentication"); // Optional log
            } catch (releaseError) {
                console.error('Error releasing database connection in /authentication:', releaseError);
            }
        }
        // --- End crucial block ---
    }
});


// Logout
router.post('/api/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
    });
    res.json({ message: 'Logged out' });
});





export default router