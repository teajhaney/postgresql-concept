import db from '../db/db.js';

//WHERE clause
export const getUsersWithCondition = async condition => {
  try {
    const query = `SELECT * FROM users WHERE ${condition}`;
    const result = await db(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching users with condition:', error);
    throw error;
  }
};

export const getUsersSorted = async (sortBy, order = 'ASC') => {
  try {
    const query = `SELECT * FROM users 
	ORDER BY ${sortBy} ${order}`;
    const result = await db(query);
    console.log(`Users sorted by ${sortBy} in ${order} order:`, result.rows);
  } catch (error) {
    console.error('Error in getUsersSorted:', error);
    throw error;
  }
};

export const paginateUsers = async (limit, offset) => {
  try {
    const query = `
 SELECT * FROM users
 LIMIT $1
 OFFSET $2
 `;
    const result = await db(query, [limit, offset]);

    if (result.rows.length > 0) {
      console.log(`Paginated users:`, result.rows);
      return result.rows;
    } else {
      console.log('No more users to display.');
    }
  } catch (error) {
    console.error('Error in paginateUsers:', error);
    throw error;
  }
};
