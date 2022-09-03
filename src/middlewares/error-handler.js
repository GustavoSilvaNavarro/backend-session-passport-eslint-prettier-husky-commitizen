import { PageNotFound } from '../utils/user-errors.js';
import logger from '../utils/loggers.js';

//GLOBAL VARIABLES
export const globalVariables = (req, res, next) => {
  res.locals.error = req.flash('error');
  next();
};

export const notFoundPageError = (req, res, next) => {
  const err = new PageNotFound().setError();
  logger.warn(err.message);
  next(err);
};

export const mainErrorHandler = (err, req, res, next) => {
  // res.status(err.status || 500).json({
  //   error: {
  //     status: err.status || 500,
  //     message: err.message,
  //   },
  // });
  res.status(err.status || 500).render('pageNotFound', { error: err.message });
};
