import express from 'express';
import {
  addNewBoook,
  fetchBooks,
  fetchBookById,
  modifyBook,
  removeBook,
} from '../controllers/book.controller.js';
const router = express.Router();

router.get('/', fetchBooks);
router.get('/:id', fetchBookById);
router.post('/add', addNewBoook);
router.put('/update/:id', modifyBook);
router.delete('/delete/:id', removeBook);

export default router;
