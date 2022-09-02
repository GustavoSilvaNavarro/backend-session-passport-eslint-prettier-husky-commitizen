import pino from 'pino';
import env from './variables-env.js';

const loggerInProduction = () => {
  const loggerProduction = pino({
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
          },
          levels: ['info', 'warn', 'error'],
        },
        {
          target: 'pino/file',
          level: 'warn',
          options: {
            destination: './src/logs/warn.log',
          },
        },
        {
          target: 'pino/file',
          level: 'error',
          options: {
            destination: './src/logs/error.log',
          },
        },
      ],
    },
  });

  return loggerProduction;
};

const loggerDev = () => {
  const loggerDevelopment = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: true,
      },
    },
  });

  return loggerDevelopment;
};

let logger = null;

if (env.enviroment.toLowerCase() === 'development') {
  logger = loggerDev();
} else {
  logger = loggerInProduction();
}

export default logger;
