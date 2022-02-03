/**
 * @purpose      To divert control to diff routes when given path is hit.
 * @module       routes
 * @file         address.route.js
 * @author       deepak
 * @since        1/2/2022
 */

 import express from 'express';
 import * as customerController from '../controllers/customer.controller';
 import * as Validator from '../validators/validator';
 
 const router = express.Router();
 
 //route to add book
 router.post('/userAddress', Validator.addressValidator, customerController.newAddress);
 
 export default router;
 