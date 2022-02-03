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
router.post('/cart', userAuth, cartController.addCart);

//get all Books
router.get('/cart', userAuth, cartController.getCart);

//get single book
router.get('/cart/:bookId', userAuth, cartController.getCartById);

//update cart
router.put('/update/:bookId', userAuth, cartController.updateCart);

//remove book from cart
router.put('/remove/:bookId', userAuth, cartController.removeCart);

export default router;
