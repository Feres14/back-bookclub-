import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// inscription d'un nouvel utilisateur
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// connexion d'un utilisateur existant
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
