
import { addAuthor, deleteAuthor } from '../services/author.service.js';

export const addNewAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const newAuthor = await addAuthor(name);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add author' });
  }
};

export const removeAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAuthor(parseInt(id, 10));
    res
      .status(200)
      .json({ message: `Author with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};


