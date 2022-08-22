import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

//YARGS SETUP
const args = yargs(hideBin(process.argv))
  .alias({ p: 'port', n: 'name' })
  .default({ port: 8080, name: 'Antonio' }).argv;

//GET INFO OF THE PC WITH YARGS
export const getInfoFromPC = (req, res, next) => {
  try {
    const entryArguments = `Port: ${args.port} - Name: ${args.name}`;
    const result = {
      entryArgs: entryArguments,
      plataform: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage().rss,
      path: process.execPath,
      processId: process.pid,
      dirWorkName: process.cwd(),
    };
    res.status(200).render('info', { result });
  } catch (err) {
    next(err);
  }
};

//COMPUTE RANDOM NUMBERS USING FORK AND PROCESS
export const computeRandomNumbers = (req, res, next) => {
  try {
    res.send('Hello World');
  } catch (err) {
    next(err);
  }
};
