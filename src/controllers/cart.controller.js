/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         cart.controller.js
 * @author       deepak
 * @since        1/2/2022
 */
import * as cartService from '../services/cart.service';

/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addCart = async (req, res, next) => {
  try {
    const data = await cartService.addCart(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

//get cart items
/**
 * Controller to get all Books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCart = async (req, res, next) => {
  try {
    const data = await cartService.getCart(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCartById = async (req, res, next) => {
  try {
    const data = await cartService.getCartById(req);
    // const data = await cartService.getCart(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

//update cart items

/**
 * Controller to update a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateCart = async (req, res, next) => {
  try {
    const data = await cartService.updateCart(req.params.bookId, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

//delete cart items
/**
 * Controller to delete a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeCart = async (req, res, next) => {
  try {
    //await cartService.deleteBook(req.params._id);
    let data = await cartService.removeCart(req.params.bookId,req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
