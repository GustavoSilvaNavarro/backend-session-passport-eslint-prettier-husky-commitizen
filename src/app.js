import 'dotenv/config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import cluster from 'cluster';
import os from 'os';

import logger from './utils/loggers.js';

//YARGS SETUP
const args = yargs(hideBin(process.argv))
  .alias({ m: 'mode' })
  .default({ mode: 'fork' }).argv;

import connectionToServer from './server/server.js';
import { connectDB } from './db/dbMDB.js';

const cpus = os.cpus();

const { server, app } = connectionToServer;
connectDB();

if (args.mode === 'cluster' && cluster.isPrimary) {
  // if it is not the main process creates workers
  cpus.map(() => {
    cluster.fork();
  });

  // In case a worker died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker with ID ${worker.process.pid} crushed`);
    cluster.fork();
  });
} else {
  // once they are created since they are not the main process they will listen the server in the port 3000
  server.listen(app.get('port'), () => {
    // console.log(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
    logger.warn(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
  });
}
