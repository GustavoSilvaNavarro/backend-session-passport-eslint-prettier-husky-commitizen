import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';

import { args } from './utils/yargs.js';
import logger from './utils/loggers.js';
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
    logger.warn(`Worker with ID ${worker.process.pid} crushed`);
    cluster.fork();
  });
} else {
  // once they are created since they are not the main process they will listen the server in the port 3000
  server.listen(app.get('port'), () => {
    logger.info(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
  });
}
