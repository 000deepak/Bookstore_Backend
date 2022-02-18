/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         cart.controller.js
 * @author       deepak
 * @since        1/2/2022
 */
import * as cartService from '../services/cart.service';
import logger from '../config/logger';

/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addCart = async (req, res, next) => {
  try {
    const data = await cartService.addCart(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in adding book to cart', error);
    next(error);
  }
};

/**
 * Controller to get all Books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCart = async (req, res, next) => {
  try {
    const data = await cartService.getCart(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in gettting cart books', error);
    next(error);
  }
};

/**
 * Controller to update a Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateCart = async (req, res, next) => {
  try {
    const data = await cartService.updateCart(req);
    res.status(data.status).json(data);
  } catch (error) {
    logger.error('error in updating cart', error);
    next(error);
  }
};
