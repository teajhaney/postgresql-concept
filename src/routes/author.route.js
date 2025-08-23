import express from 'express';
import {
  addNewAuthor,
  removeAuthor,
} from '../controllers/author.controller.js';

const router = express.Router();

router.post('/add', addNewAuthor);
router.delete('/delete/:id', removeAuthor);

export default router;
