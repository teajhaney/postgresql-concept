import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../services/book.service.js';

export const addNewBoook = async (req, res) => {
  try {
    const { title, publishedDate, authorId } = req.body;
    const newBook = await addBook(title, new Date(publishedDate), authorId);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add author' });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const fetchBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(parseInt(id));
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export const modifyBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBook = await updateBook(parseInt(id), title);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const removeBook = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBook(parseInt(id));
    res.status(204).json('Book deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
