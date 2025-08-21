import { createUserTable } from './concepts/basic-queries.js';

//test basic queries

const textBasicQueries = async () => {
  try {
    // await createUserTable();
  } catch (error) {
    console.error('Error in basic queries:', error);
    throw error;
  }
};

async function runAllQueries() {
  await textBasicQueries();
}

runAllQueries();
