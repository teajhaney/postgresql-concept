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

export async function averagePostByUser() {
  const averagePostByUserQuery = `
	SELECT AVG(post_count) AS average_posts
	FROM (
		SELECT COUNT(posts.id) AS post_count
		FROM users
		LEFT JOIN posts ON users.id = posts.user_id
		GROUP BY users.id
	) AS user_post_counts
	`;

  try {
    const result = await db(averagePostByUserQuery);
    return result.rows[0];
  } catch (error) {
    console.error('Error executing averagePostByUser:', error);
    throw error;
  }
}
