import express from 'express';
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { createCompany, getCompany, setCompanyActive } from '../controllers/companyController.js';

router.use(isAuthenticatedUser);

router.route('/companies').get(getCompany);
router.route('/companies').post(createCompany);
router.route('/companies/:id/set_active').put(setCompanyActive);

export default router;