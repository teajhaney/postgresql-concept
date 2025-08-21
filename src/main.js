import {
  createUserTable,
  insertUser,
  fetchAllUsers,
  updateUserEmail,
  deleteUser,
} from './concepts/basic-queries.js';

//test basic queries

const textBasicQueries = async () => {
  try {
    // await createUserTable();

    //insert user
    // await insertUser('john doe', 'john@example.com');
    // await insertUser('Youju Kang', 'youju@example.com');
    // await insertUser('Seobi Kang', 'seobikang@example.com');
    // await insertUser('Tijani Yusuf', 'tijaniyusuf@example.com');

    //fetch all users
    // console.log('All users');
    // const allUsers = await fetchAllUsers({});
    // console.log(allUsers);

    //update user
    // console.log('Update info');
    // const updatedUser = await updateUserEmail('john doe', 'john@gmail.con');
    //   console.log(updatedUser);

    //delete user
    console.log('Update info');
    const de = await deleteUser('john doe');
    console.log(deleteUser);
  } catch (error) {
    console.error('Error in basic queries:', error);
    throw error;
  }
};

async function runAllQueries() {
  await textBasicQueries();
}

runAllQueries();
