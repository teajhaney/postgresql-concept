import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export const addAuthor = async name => {
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name,
        // book: {
        //   connect: [],
        // },
      },
    });
    return newAuthor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAuthor = async id => {
  try {
    const author = await prisma.author.findUnique({
      where: { id },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true }, // Include related books if needed
    });

    return deletedAuthor;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
