/**
 * @purpose      To divert  & control to diff routes when given path is hit.
 * @module       routes
 * @file         cart.route.js
 * @author       deepak
 * @since        1/2/2022
 */

import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/cart/:bookId', userAuth, cartController.addCart);

//get all Books
router.get('/cart', userAuth, cartController.getCart);

//update cart
router.put('/update/:bookId', userAuth, cartController.updateCart);

export default router;
