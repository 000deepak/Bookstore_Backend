
/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         book.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

 import * as wishlistService from '../services/wishlist.service';

 /**
  * Controller to create a new Book
  * @param  {object} req - request object
  * @param {object} res - response object
  * @param {Function} next
  */
 export const newBook = async (req, res, next) => {
   try {
     const data = await wishlistService.newBook(req);
     res.status(data.status).json(data);
   } catch (error) {
     next(error);
   }
 };
 

 /**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         wishlist.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

/**
 * Controller to get all Books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.getWishlist(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};


/**
 * Controller to delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeWishlist = async (req, res, next) => {
  try {

    let data = await wishlistService.removeWishlist(req);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
