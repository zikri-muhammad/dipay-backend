import express from 'express';
const router = express.Router();

import { 
    getUserProfile
 } from '../controllers/userController.js';

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

router.use(isAuthenticatedUser);

router.route('/me').get(getUserProfile);

export default router;