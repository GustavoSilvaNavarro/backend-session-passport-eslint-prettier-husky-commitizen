import { Router } from 'express';
const router = Router();

import { getInfoFromPC } from '../controllers/yargs-controllers.js';

//GET INFO OF THE PC WITH YARGS
router.get('/info', getInfoFromPC);

export default router;
