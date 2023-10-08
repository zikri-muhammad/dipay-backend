import express from 'express';
const router = express.Router();
import { duplicateZero } from '../controllers/duplicateZeroController.js';

router.route('/combination').post(duplicateZero);

export default router;