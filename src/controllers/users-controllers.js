import { Products } from '../db/dbFBS.js';
import logger from '../utils/loggers.js';

//GET - Show products
export const showMainPage = async (req, res, next) => {
  try {
    let productsArr = [];

    const dataProducts = await Products.get();
    dataProducts.forEach((product) => productsArr.push({ id: product.id, ...product.data() }));

    const userName = req.user.name;
    const email = req.user.email;

    res.status(200).render('index', { userName, email, productsArr });
    logger.info('Get Request: Show main page');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Render add products page
export const renderAddProductPage = (req, res, next) => {
  try {
    res.status(200).render('products');
    logger.info('Get Request: Render page to add products');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Get all products from the form
export const getProductInfo = async (req, res, next) => {
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
    logger.info('Post Request: Create new Product');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Signup page
export const renderRegisterPage = (req, res, next) => {
  try {
    res.status(200).render('signup');
    logger.info('Get Request: Render register page');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Signup page
export const getUserInfo = async (req, res, next) => {
  try {
    res.status(301).redirect('/login');
    logger.info('Post Request: Register process, creating user');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Show login page
export const renderLoginPage = (req, res, next) => {
  try {
    res.status(200).render('login');
    logger.info('Get Request: Render login page');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//POST - Login authentication of my user
export const getUserInfoToAuthenticate = (req, res, next) => {
  try {
    res.status(200).redirect('/');
    logger.info('Post Request: Login process');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//GET - Logout and render the page of logout
export const renderLogoutPage = (req, res, next) => {
  try {
    const userName = req.user.name;

    req.logout((err) => {
      if (err) {
        throw err;
      }

      res.status(200).render('logout', { userName });
      logger.info('Get Request: Logging out a user');
    });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};
