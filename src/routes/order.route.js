/**
 * @purpose      To divert  & control to rderr routes when given path is hit.
 * @module       routes
 * @file         order.route.js
 * @author       deepak
 * @since        1/2/2022
 */

 import express from 'express';
 import * as orderController from '../controllers/order.controller';
 import * as Validator from '../validators/validator';
 
 const router = express.Router();
 
 //route to add book
 router.post('/addorder', Validator.orderValidator, orderController.newOrder);
 
 export default router;
 