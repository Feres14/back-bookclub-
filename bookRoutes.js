import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {addBook,getAllBooks,toggleFavorite,deleteBook, getBookById} from '../controllers/bookController.js';

const router = express.Router();

router.post('/',authMiddleware, addBook);
router.get('/',authMiddleware, getAllBooks);
router.post('/favorite/:id',authMiddleware, toggleFavorite);
router.delete('/:id',authMiddleware, deleteBook);
router.get('/:id',authMiddleware, getBookById);

export default router;