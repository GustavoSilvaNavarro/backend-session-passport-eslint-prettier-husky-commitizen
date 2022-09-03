import mongoose from 'mongoose';
import env from '../utils/variables-env.js';
import logger from '../utils/loggers.js';

//DB CONNECTION
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(env.dbNameUsers);

    logger.info(`DB is connected to ${db.connection.host}`);
  } catch (err) {
    logger.error('Error linking the Data Base');
    logger.error(err.message);
    process.exit(1);
  }
};
