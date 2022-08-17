import { Router } from 'express';
const router = Router();

import {
  showMainPage,
  renderRegisterPage,
  getUserInfo,
  renderLoginPage,
  getUserInfoToAuthenticate,
} from '../controllers/users-controllers.js';

//GET - Show products
router.get('/', showMainPage);

//GET - Signup page
router.get('/signup', renderRegisterPage);

//POST - Signup page
router.post('/signup', getUserInfo);

//GET - login page
router.get('/login', renderLoginPage);

//POST - login post user info to authenticate
router.post('/login', getUserInfoToAuthenticate);

export default router;
