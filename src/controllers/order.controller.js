/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         order.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

import * as orderService from '../services/order..service';

/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newOrder = async (req, res, next) => {
  try {
    const data = await orderService.newOrder(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
