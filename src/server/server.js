import express from 'express';
import compression from 'compression';
import { Server as SocketIo } from 'socket.io';
import http from 'http';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import flash from 'connect-flash';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import env from '../utils/variables-env.js';
import { passportLoginSetupInitialize } from '../config/passport-login.js';
import { socketsEvents } from '../sockets/sockets.js';

//YARGS SETUP
const args = yargs(hideBin(process.argv))
  .alias({ p: 'port', n: 'name' })
  .default({ port: 8080, name: 'Antonio' }).argv;

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server);
passportLoginSetupInitialize(passport);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('port', parseInt(args.port) || process.env.PORT || 8080);
app.set('json spaces', 2);
app.set('views', path.join(__dirname, '../views'));
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: env.dbName,
      ttl: 600,
      autoRemove: 'native',
    }),
    secret: env.secretKey,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));
import userRoutes from '../routes/users-routes.js';
import yargsRoutes from '../routes/yargs-routes.js';
import {
  mainErrorHandler,
  notFoundPageError,
  globalVariables,
} from '../middlewares/error-handler.js';

//GLOBAL VARIABLES
app.use(globalVariables);

app.use('/', userRoutes);
app.use('/', yargsRoutes);

//NON EXISTING ROUTES
app.use(notFoundPageError);

//ERROR HANDLER
app.use(mainErrorHandler);

//WEB SOCKETS
socketsEvents(io);

export default { server, app };
