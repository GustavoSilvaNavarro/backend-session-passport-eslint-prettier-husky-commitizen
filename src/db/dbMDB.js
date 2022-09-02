import mongoose from 'mongoose';
import env from '../utils/variables-env.js';
import logger from '../utils/loggers.js';

//DB CONNECTION
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(env.dbNameUsers);

    logger.error(`DB is connected to ${db.connection.host}`);
  } catch (err) {
    console.log('Error detected');
    console.log(err.message);
    process.exit(1);
  }
};
