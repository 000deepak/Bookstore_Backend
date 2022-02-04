/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         wishlist.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

import wishlistService from '../services/wishlist.service';
/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.addWishlist(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get all Books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.getWishlist();
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

//remove from  wishlist
/**
 * Controller to delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateWishlist = async (req, res, next) => {
  try {
    //await BookService.deleteBook(req.params._id);
    let data = await wishlistService.deleteWishlist(req.params._id);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
