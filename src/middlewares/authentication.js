export const userIsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isLogged) {
    return next();
  }

  res.status(301).redirect('/login');
};
