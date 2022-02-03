/**
 * @purpose      To divert & control to diff routes when given path is hit.
 * @module       routes
 * @file         index.js
 * @author       deepak
 * @since        1/2/2022
 */

import express from 'express';
import bookRoute from './book.route';
import userRoute from './user.route';
import cartRoute from './cart.route';
import customerRoute from './customer.route';
import orderRoute from './order.route';

const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome To Bookstore Application');
  });
  router.use('/book', bookRoute);
  router.use('/user', userRoute);
  router.use('/cart', cartRoute);
  router.use('/customer', customerRoute);
  router.use('/order', orderRoute);

  return router;
};

export default routes;
