/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         book.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

import * as wishlistService from '../services/wishlist.service';
import logger from '../config/logger';


/**
 * Controller to add book to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newBook = async (req, res, next) => {
  try {
    const data = await wishlistService.newBook(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in adding book to cart', error);

    next(error);
  }
};

/**
 * Controller to get wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.getWishlist(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in getting wishlist', error);

    next(error);
  }
};

/**
 * Controller to remove book from wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeWishlist = async (req, res, next) => {
  try {
    let data = await wishlistService.removeWishlist(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in updating wishlist', error);

    next(error);
  }
};
