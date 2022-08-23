import { PageNotFound } from '../utils/user-errors.js';

export const notFoundPageError = (req, res, next) => {
  const err = new PageNotFound().setError();
  next(err);
};

export const mainErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};
