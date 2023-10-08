import express from 'express';
const router = express.Router();
import { getCountry } from '../controllers/countryController.js';


router.route('/countries').get(getCountry);

export default router;