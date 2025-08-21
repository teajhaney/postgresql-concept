import {
  createUserTable,
  insertUser,
  fetchAllUsers,
  updateUserEmail,
  deleteUser,
} from './concepts/basic-queries.js';

import {
  getUsersWithCondition,
  getUsersSorted,
  paginateUsers,
} from './concepts/filtering-sorting.js';

import { createPostTable, insertPost } from './concepts/relationships.js';

//test basic queries

const textBasicQueries = async () => {
  try {
    // await createUserTable();

    // insert user
    await insertUser('john doe', 'john@example.com');
    await insertUser('Youju Kang', 'youju@example.com');
    await insertUser('Seobi Kang', 'seobikang@example.com');
    await insertUser('Tijani Yusuf', 'tijaniyusuf@example.com');

    // fetch all users
    console.log('All users');
    const allUsers = await fetchAllUsers({});
    console.log(allUsers);

    // update user
    console.log('Update info');
    const updatedUser = await updateUserEmail('john doe', 'john@gmail.con');
    console.log(updatedUser);

    //delete user
    console.log('Update info');
    const de = await deleteUser('john doe');
    console.log(deleteUser);
  } catch (error) {
    console.error('Error in basic queries:', error);
    throw error;
  }
};

async function testFilteringSorting() {
  try {
    //filtering users
    // const condition = "username LIKE 'Y%'"; // Example condition to filter users whose username starts with 'Y'
    // const sortedUsers = await getUsersWithCondition(condition);
    // console.log('Filtered users:', sortedUsers);

    //sorting users
    // const sortBy = 'username'; // Column to sort by
    // const order = 'ASC'; // Sort order, can be 'ASC' or 'DESC'
    // const orderUsers = await getUsersSorted(sortBy, order);
    // console.log(`Users sorted by ${sortBy} in ${order} order:`, orderUsers);

    //pagination
    const limit = 1; // Number of users per page
    const offset = 2; // Offset for pagination, e.g., 0 for the first page, 2 for the second page
    const paginatedUsers = await paginateUsers(limit, offset);
    console.log(`Paginated users:`, paginatedUsers);
  } catch (error) {
    console.error('Error in filtering and sorting:', error);
  }
}

async function testRelationshipQueries() {
  try {
    // await createPostTable();

    //insert a post
    const post = await insertPost(
      'My first post',
      'This is the content of my first post.',
      3 // Assuming user with ID 1 exists
    );
    console.log('Inserted post:', post);
  } catch (error) {
    console.error('Error in creating tables:', error);
  }
}

async function runAllQueries() {
  //   await textBasicQueries();
  //   await testFilteringSorting();
  await testRelationshipQueries();
}

runAllQueries();
