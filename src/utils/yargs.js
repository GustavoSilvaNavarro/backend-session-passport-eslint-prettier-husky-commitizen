import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

//YARGS SETUP
export const args = yargs(hideBin(process.argv))
  .alias({ p: 'port', m: 'mode', n: 'name' })
  .default({ port: 8080, mode: 'fork', name: 'Antonio' }).argv;
