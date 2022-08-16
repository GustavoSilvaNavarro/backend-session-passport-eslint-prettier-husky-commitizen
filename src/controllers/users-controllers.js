export const showMainPage = (req, res) => {
  res.status(200).render('index');
};

export const renderLoginPage = (req, res) => {
  res.status(200).render('login');
};
