const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const userRecord = await db.collection('users').where('email', '==', email).get();
    if (!userRecord.empty) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      email,
      password: hashedPassword
    };

    const docRef = await db.collection('users').add(newUser);
    
    res.status(201).json({ message: 'User registered successfully', userId: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userRecord = await db.collection('users').where('email', '==', email).get();
    if (userRecord.empty) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const user = userRecord.docs[0].data();
    const userId = userRecord.docs[0].id;

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create and assign a token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };