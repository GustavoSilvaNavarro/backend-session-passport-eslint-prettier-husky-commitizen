import { Products } from '../db/dbFBS.js';

//GET - Show products
export const showMainPage = async (req, res, next) => {
  try {
    let productsArr = [];

    const dataProducts = await Products.get();
    dataProducts.forEach((product) =>
      productsArr.push({ id: product.id, ...product.data() })
    );

    const userName = req.user.name;
    const email = req.user.email;

    res.status(200).render('index', { userName, email, productsArr });
  } catch (err) {
    next(err);
  }
};

//GET - Render add products page
export const renderAddProductPage = (req, res, next) => {
  try {
    res.status(200).render('products');
  } catch (err) {
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
  } catch (err) {
    next(err);
  }
};

//GET - Signup page
export const renderRegisterPage = (req, res, next) => {
  try {
    res.status(200).render('signup');
  } catch (err) {
    next(err);
  }
};

//POST - Signup page
export const getUserInfo = async (req, res, next) => {
  try {
    res.status(301).redirect('/login');
  } catch (err) {
    next(err);
  }
};

//GET - Show login page
export const renderLoginPage = (req, res, next) => {
  try {
    res.status(200).render('login');
  } catch (err) {
    next(err);
  }
};

//POST - Login authentication of my user
export const getUserInfoToAuthenticate = (req, res, next) => {
  try {
    res.status(200).redirect('/');
  } catch (err) {
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
    });
  } catch (err) {
    next(err);
  }
};
