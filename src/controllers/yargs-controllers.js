import { fork } from 'child_process';
import os from 'os';

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
  } catch (err) {
    next(err);
  }
};

//COMPUTE RANDOM NUMBERS USING FORK AND PROCESS
export const computeRandomNumbers = (req, res, next) => {
  try {
    let amount = req.query.cantidad;

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
  } catch (err) {
    next(err);
  }
};
