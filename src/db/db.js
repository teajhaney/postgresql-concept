import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

//create a new pool instance to manage database connections
//-> This allows us to connect to the PostgreSQL database using the connection string from the environment variable
//-> The connection string is typically in the format: postgres://username:password@host:port/database
//-> The Pool instance will handle the connection pooling, which is more efficient for handling multiple requests
//-> The connection string is stored in the environment variable DATABASE_URL, which is set up in the .env file
//-> The Pool instance will automatically manage the connections, allowing us to query the database without having to manually open and close connections each time
//-> This is particularly useful in a web application where multiple requests may be made to the database concurrently
//-> The Pool instance will also handle errors and retries, making it more robust for production use
//-> The Pool instance can be reused across different parts of the application, allowing for efficient database access
//-> The Pool instance can be configured with additional options such as maximum number of connections, idle timeout, etc.
//-> The Pool instance can be used to execute queries, transactions, and other database operations

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    //execution time
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Error executing query', { text, params, error });
    throw error; // rethrow the error after logging it
  }
}

export default query;
