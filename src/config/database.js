/**
 * @purpose      To eastablish connection with db when fn is called in index
 * @module       config
 * @file         database.js
 * @author       deepak 
 * @since        1/2/2022
 */

import mongoose from 'mongoose';
import logger from './logger.js';

const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE =
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_TEST
      : process.env.DATABASE;

    await mongoose.connect(DATABASE, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to the database.');
  } catch (error) {
    logger.error('Could not connect to the database.', error);
  }
};
export default database;
