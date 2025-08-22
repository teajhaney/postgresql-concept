import db from '../db/db.js';

export const createPostTable = async () => {
  const createTableQuery = `
CREATE TABLE IF NOT EXISTS posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Foreign key referencing users table and deleting posts if the user is deleted
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
	`;

  try {
    await db(createTableQuery);
    console.log('Posts table created successfully');
  } catch (error) {
    console.error('Error creating posts table:', error);
    throw error;
  }
};

export const insertPost = async (title, content, userId) => {
  const insertQuery = `
	  INSERT INTO posts (title, content, user_id)
	  VALUES ($1, $2, $3)
	  RETURNING *
	  `;

  try {
    const result = await db(insertQuery, [title, content, userId]);
    console.log('Post inserted successfully:');
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting post:', error);
    throw error;
  }
};
