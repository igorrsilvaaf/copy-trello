import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!await user.comparePassword(password)) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
}; 