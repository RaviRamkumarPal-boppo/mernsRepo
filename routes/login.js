import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js'; // Import the User model

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; 

router.post('/', async (req, res) => {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' }); 

    // Set the token in cookies
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds
    });

    res.status(200).json({
        token,
        message: 'User logged in successfully.'
    });
});

export default router;
