import db from '../db/db.js';

//inner join  returns rows when there is a match in both tables
export const getUsersWithPosts = async () => {

    const getUsersWithPostsQuery = `
		 SELECT users.id, users.username, posts.title
		 FROM users
		 INNER JOIN posts ON users.id = posts.user_id
		 ORDER BY users.id;
		`;
	  
	    try {
	      const result = await db(getUsersWithPostsQuery);
	      return result.rows;
      } catch (error) {
        console.error('Error fetching users with posts:', error);
        throw error;
      }
};


//left join returns all rows from the left table and matched rows from the right table
export const getUsersWithPostsLeftJoin = async () => {
  const getUsersWithPostsLeftJoinQuery = `
	SELECT users.id, users.username, posts.title
	FROM users
	LEFT JOIN posts ON users.id = posts.user_id
	ORDER BY users.id;
  `;

  try {
	const result = await db(getUsersWithPostsLeftJoinQuery);
	return result.rows;
  } catch (error) {
	console.error('Error fetching users with posts using left join:', error);
	throw error;
  }
}
