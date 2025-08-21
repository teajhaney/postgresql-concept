import db from '../db/db.js';

export const createUserTable = async () => {
  const createTableQuery = `
	CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	)
	`;
  try {
    await db(createTableQuery);
    console.log('User table created successfully');
  } catch (error) {
    console.error('Error creating user table:', error);
    throw error;
  }
};



export const insertUser = async (username, email) => {
	
}
