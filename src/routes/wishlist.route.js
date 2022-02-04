/**
 * @purpose      To divert  & control to diff routes when given path is hit.
 * @module       route
 * @file         wishlist.route.js
 * @author       deepak
 * @since        1/2/2022
 */

import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to wishlist
router.post('/wishlist/:bookId', userAuth, wishlistController.newBook);

//get all wishlist
router.get('/wishlist', userAuth, wishlistController.getWishlist);

//remove from wishlist
router.put('/remove/:bookId', userAuth, wishlistController.removeWishlist);

export default router;
