import express from 'express';
import bcrypt from 'bcryptjs';
import pool from './db.js';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [user, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ message: 'Username Taken' });
        } else {
            res.status(500).json({ message: 'Server Error' });
        }
    }
});

// Sign-In Route
router.post('/signin', async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check if user exists
        const userResult = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [user]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const userRecord = userResult.rows[0];

        // Check if password matches
        const isMatch = await bcrypt.compare(pwd, userRecord.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user: userRecord });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
