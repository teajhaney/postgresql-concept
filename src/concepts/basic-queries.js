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
  const insertQuery = `
	INSERT INTO users (username, email)
	VALUES ($1,$2)
	RETURNING *
	`;

  try {
    const res = await db(insertQuery, [username, email]);
    console.log('User inserted successfully', res.rows[0]);

    return res.rows[0];
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

export const fetchAllUsers = async ({}) => {
  const fetchAllUser = `SELECT * FROM users`;
  try {
    const res = await db(fetchAllUser);
    console.log('Fetched all users successfully', res.rows);
    return res.rows;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const updateUserEmail = async (username, newEmail) => {
  const updateEmail = `
	UPDATE users
	SET email = $2
	WHERE username= $1
	RETURNING *
	`;

  try {
    const res = await db(updateEmail, [username, newEmail]);
    if (res.rows.length > 0) {
      console.log('User email updated successfully', res.rows[0]);
      return res.rows[0];
    } else {
      console.log('User not found with given username:', username);
      return null;
    }
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
};

export const deleteUser = async username => {
  const deleteUserQuery = `
	DELETE FROM users
	WHERE username = $1
	RETURNING *
	`;
  try {
    const res = await db(deleteUserQuery, [username]);
    if (res.rows.length > 0) {
      console.log('User deleted successfully', res.rows[0]);
      return res.rows[0];
    } else {
      console.log('User not found with given username:', username);
      return null;
    }
  } catch (error) {
    console.error('Error deleting user :', error);
    throw error;
  }
};
