/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         user.controller.js
 * @author       deepak
 * @since        1/2/2022
 */

import * as userService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const signup = async (req, res, next) => {
  try {
    console.log(req.body.firstName);
    const data = await userService.signup(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to loginuser
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const signin = async (req, res, next) => {
  try {
    const data = await userService.signin(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to forgoot pasword link
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const verify = async (req, res, next) => {
  try {
    const data = await userService.verify(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};
