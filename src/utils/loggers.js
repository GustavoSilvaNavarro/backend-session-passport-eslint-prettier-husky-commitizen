import { createLogger, transports, format } from 'winston';
import env from './variables-env.js';

const customeFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.label({ label: process.pid }),
  format.errors({ stack: true }),
  format.printf((info) => {
    return `${info.level.toUpperCase()} [${info.timestamp}] (${info.label}): ${info.stack || info.message}`;
  })
);

const loggerDev = () => {
  const logDevelop = createLogger({
    format: customeFormat,
    transports: [new transports.Console()],
  });

  return logDevelop;
};

const loggerProd = () => {
  const logProd = createLogger({
    format: customeFormat,
    transports: [
      new transports.Console(),
      new transports.File({
        level: 'error',
        filename: './src/logs/error.log',
        maxsize: 5120000,
        maxFiles: 5,
      }),
      new transports.File({
        level: 'warn',
        filename: './src/logs/warn.log',
        maxFiles: 5,
        maxsize: 5120000,
      }),
    ],
  });

  return logProd;
};

let logger = null;

if (env.enviroment.toLowerCase() === 'development') {
  logger = loggerDev();
} else {
  logger = loggerProd();
}

export default logger;

//? PINO LOGGER EXAMPLE  - I need to install pino and pino-pretty to make it work
// import pino from 'pino';
// import env from './variables-env.js';

// const loggerInProduction = () => {
//   const loggerProduction = pino({
//     transport: {
//       targets: [
//         {
//           target: 'pino-pretty',
//           options: {
//             colorize: true,
//             levelFirst: true,
//           },
//           levels: ['info', 'warn', 'error'],
//         },
//         {
//           target: 'pino/file',
//           level: 'warn',
//           options: {
//             destination: './src/logs/warn.log',
//           },
//         },
//         {
//           target: 'pino/file',
//           level: 'error',
//           options: {
//             destination: './src/logs/error.log',
//           },
//         },
//       ],
//     },
//   });

//   return loggerProduction;
// };

// const loggerDev = () => {
//   const loggerDevelopment = pino({
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         translateTime: true,
//       },
//     },
//   });

//   return loggerDevelopment;
// };

// let logger = null;

// if (env.enviroment.toLowerCase() === 'development') {
//   logger = loggerDev();
// } else {
//   logger = loggerInProduction();
// }

// export default logger;
