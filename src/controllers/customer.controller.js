/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         address.controller.js
 * @author       deepak
 * @since        1/2/2022
 */
import * as addressService from '../services/customer.service';

/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newAddress = async (req, res, next) => {
  try {
    const data = await addressService.newAddress(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
