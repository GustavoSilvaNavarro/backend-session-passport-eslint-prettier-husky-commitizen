import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import env from './utils/variables-env.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: env.dbName }),
    secret: env.secretKey,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log('Server on Port: ', app.get('port'));
});
