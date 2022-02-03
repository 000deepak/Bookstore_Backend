/**
 * @purpose      To divert  & control to user routes when given path is hit.
 * @module       routes
 * @file         user.route.js
 * @author       deepak
 * @since        1/2/2022
 */

import express from 'express';
import * as userController from '../controllers/user.controller';
import * as Validator from '../validators/validator';

const router = express.Router();

//route to add book
router.post('/signup', Validator.userValidator, userController.signup);
router.post('/signin', Validator.loginValidator, userController.signin);

export default router;
