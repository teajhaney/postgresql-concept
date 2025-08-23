import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

export const addBook = async (title, publishedDate, authorId) => {
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        publishedDate,
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: true,
      },
    });
    return newBook;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    return books;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getBookById = async id => {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBook = async (id, newTitle) => {
  try {
    // const book = await prisma.book.findUnique({
    //   where: { id },
    //   include: { author: true },
    // });
    // if (!book) {
    //   throw new Error('Book not found');
    // }

    // const updatedBook = await prisma.book.update({
    //   where: { id },
    //   data: {
    //     title: newTitle,
    //   },
    //   include: { author: true },
    // });
    // return updatedBook;
    //using transaction
    const updatedBook = await prisma.$transaction(async prisma => {
      const book = await prisma.book.findUnique({
        where: { id },
        include: { author: true },
      });
      if (!book) {
        throw new Error('Book not found');
      }
      return prisma.book.update({
        where: { id },
        data: {
          title: newTitle,
        },
        include: { author: true },
      });
    });
    return updatedBook;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBook = async id => {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new Error('Book not found');
    }

    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    return { message: 'Book deleted successfully', deletedBook };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
