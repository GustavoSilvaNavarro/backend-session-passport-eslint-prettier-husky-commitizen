import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import env from './utils/variables-env.js';
import { connectDB } from './db/dbMDB.js';

const app = express();
connectDB();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
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
import userRoutes from './routes/users-routes.js';

app.use('/', userRoutes);

app.listen(app.get('port'), () => {
  console.log('Server on Port: ', app.get('port'));
});
