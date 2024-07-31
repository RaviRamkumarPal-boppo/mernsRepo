import express from 'express';
import User from '../model/user.js'; // Adjust the path if necessary

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('firstName lastName email'); 
    res.json(users); // Return users as JSON
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message }); // Handle errors
  }
});

export default router;
