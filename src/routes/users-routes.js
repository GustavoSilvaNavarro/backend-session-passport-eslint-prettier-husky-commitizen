import { Router } from 'express';
const router = Router();
import passport from 'passport';

import {
  showMainPage,
  renderRegisterPage,
  getUserInfo,
  renderLoginPage,
  getUserInfoToAuthenticate,
  renderAddProductPage,
  getProductInfo,
  renderLogoutPage,
} from '../controllers/users-controllers.js';
import { userIsAuthenticated } from '../middlewares/authentication.js';

//GET - Show products
router.get('/', userIsAuthenticated, showMainPage);

//GET - Render add products page
router.get('/products', userIsAuthenticated, renderAddProductPage);

//POST - Get all products from the form
router.post('/products', userIsAuthenticated, getProductInfo);

//GET - Signup page
router.get('/signup', renderRegisterPage);

//POST - Signup page
router.post('/signup', getUserInfo);

//GET - login page
router.get('/login', renderLoginPage);

//POST - login post user info to authenticate
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login' }),
  getUserInfoToAuthenticate
);

//GET - Logout and render the page of logout
router.get('/logout', userIsAuthenticated, renderLogoutPage);

export default router;
