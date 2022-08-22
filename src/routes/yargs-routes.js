import { Router } from 'express';
const router = Router();

import {
  getInfoFromPC,
  computeRandomNumbers,
} from '../controllers/yargs-controllers.js';

//GET INFO OF THE PC WITH YARGS
router.get('/info', getInfoFromPC);

//COMPUTE RANDOM NUMBERS USING FORK AND PROCESS
router.get('/api/randoms', computeRandomNumbers);

export default router;
