// import { Products } from '../db/dbFBS.js';
import User from '../models/user-model.js';

//GET - Show products
export const showMainPage = (req, res, next) => {
  try {
    res.status(200).render('index');
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
  const { name, email, password, password_confirm } = req.body;
  try {
    if (!name || !email || !password || !password_confirm) {
      const err = new Error('Please fill up all the fields');
      err.status = 400;
      throw err;
    }

    if (password !== password_confirm) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      throw err;
    }

    if (password.length < 6) {
      const err = new Error('Password must be at least 6 characters');
      err.status = 400;
      throw err;
    }

    const userRegistered = await User.findOne({ email: email });

    if (userRegistered) {
      const err = new Error('User already registered');
      err.status = 400;
      throw err;
    }

    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
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
    console.log(req.body);
  } catch (err) {
    next(err);
  }
};
