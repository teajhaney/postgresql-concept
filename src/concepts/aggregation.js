import db from '../db/db.js';

export const countPostByUser = async () => {
  const countPostByUserQuery = `
SELECT users.username, COUNT(posts.id) AS post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username

	`;

  try {
    const result = await db(countPostByUserQuery);
    return result.rows;
  } catch (error) {
    console.error('Error executing countPostByUser:', error);
    throw error;
  }
};
