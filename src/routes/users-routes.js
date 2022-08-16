import { Router } from 'express';
const router = Router();

import {
  showMainPage,
  renderLoginPage,
} from '../controllers/users-controllers.js';

//GET - Show products
router.get('/', showMainPage);

//GET - Login page
router.get('/login', renderLoginPage);

export default router;
