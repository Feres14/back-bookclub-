import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

// Route de connexion
router.post('/login', loginUser);

// Route d'inscription
router.post('/register', registerUser);

// Route pour récupérer tous les utilisateurs
router.get('/', authMiddleware, getAllUsers);

export default router;
