import express from 'express';
const router = express.Router();

import { 
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logout
 } from '../controllers/authController.js';

 import { isAuthenticatedUser } from '../middlewares/auth.js';

router.post('/register', registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(isAuthenticatedUser, logout);

export default router;