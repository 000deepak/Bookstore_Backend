/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         book.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

import * as bookService from '../services/book.service';

//add book
/**
 * Controller to create a new Book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newBook = async (req, res, next) => {
  try {
    const data = await bookService.newBook(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};


