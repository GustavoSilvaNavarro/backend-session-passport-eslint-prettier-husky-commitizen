import { fork } from 'child_process';
import os from 'os';
import logger from '../utils/loggers.js';
import { UserError } from '../utils/user-errors.js';

//GET INFO OF THE PC WITH YARGS
export const getInfoFromPC = (req, res, next) => {
  try {
    const result = {
      entryArgs: `${process.argv.slice(2)}`,
      plataform: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage().rss,
      path: process.execPath,
      processId: process.pid,
      dirWorkName: process.cwd(),
      workers: os.cpus().length,
    };
    res.status(200).render('info', { result });
    logger.info('Get request: Getting info of the pc');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//COMPUTE RANDOM NUMBERS USING FORK AND PROCESS
export const computeRandomNumbers = (req, res, next) => {
  try {
    let amount = req.query.cantidad;

    if (!isNaN(amount) || amount === undefined) {
      if (!amount) {
        amount = 1e8;
      }

      const forked = fork('src/apis/computeRandomNumbers.js');

      forked.on('message', (result) => {
        if (result === 'ready') {
          forked.send(amount);
        } else {
          res.status(200).json({ resultado: result });
        }
      });

      logger.info('Get request: Computing random numbers');
    } else {
      const err = new UserError('Plese insert a number or leave it blank', 400).setError();
      throw err;
    }
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};
