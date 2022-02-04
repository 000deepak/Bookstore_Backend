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
router.post('/wishlist', userAuth, wishlistController.addWishlist);

//get all wishlist
router.get('/wishlist', userAuth, wishlistController.getWishlist);

//update wishlist
router.put('/update/:bookId', userAuth, wishlistController.updateWishlist);


export default router;
