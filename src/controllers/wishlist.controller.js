/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         wishlist.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const addToWishlist = async (req, res, next) => {
    try {
      const data = await BookService.addToWishlist(req.body);
      res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  //get wishlist
  /**
   * Controller to get all Books available
   * @param  {object} req - request object
   * @param {object} res - response object
   * @param {Function} next
   */
   export const getWishlist = async (req, res, next) => {
    try {
      const data = await BookService.getWishlist();
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
   export const removeFromWishlist = async (req, res, next) => {
    try {
      //await BookService.deleteBook(req.params._id);
      let data = await BookService.removeFromWishlist(req.params._id);
      res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  