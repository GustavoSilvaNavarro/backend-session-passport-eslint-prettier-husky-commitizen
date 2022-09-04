import { Products } from '../db/dbFBS.js';
import logger from '../utils/loggers.js';

//GET - Show products
export const showMainPage = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Show main page`);
  try {
    let productsArr = [];

    const dataProducts = await Products.get();
    dataProducts.forEach((product) => productsArr.push({ id: product.id, ...product.data() }));

    const userName = req.user.name;
    const email = req.user.email;

    res.status(200).render('index', { userName, email, productsArr });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Render add products page
export const renderAddProductPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Render page to add products`);
  try {
    res.status(200).render('products');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Get all products from the form
export const getProductInfo = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Create new Product`);
  try {
    const { nombre, price, stock, url } = req.body;

    const newProduct = {
      name: nombre,
      price,
      stock,
      url,
    };

    await Products.add(newProduct);

    res.status(201).redirect('/');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Signup page
export const renderRegisterPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Render register page`);
  try {
    res.status(200).render('signup');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Signup page
export const getUserInfo = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Register process, creating user`);
  try {
    res.status(301).redirect('/login');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Show login page
export const renderLoginPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Render login page`);
  try {
    res.status(200).render('login');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Login authentication of my user
export const getUserInfoToAuthenticate = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Login process`);
  try {
    res.status(200).redirect('/');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Logout and render the page of logout
export const renderLogoutPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Logging out a user`);
  try {
    const userName = req.user.name;

    req.logout((err) => {
      if (err) {
        throw err;
      }

      res.status(200).render('logout', { userName });
    });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};
