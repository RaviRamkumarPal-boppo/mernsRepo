import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../model/user.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Check for required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully!',
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user.', error: err.message });
  }
});

export default router;
