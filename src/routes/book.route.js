/**
 * @purpose      To divert  & control to diff routes when given path is hit.
 * @module       routes
 * @file         book.route.js
 * @author       deepak
 * @since        1/2/2022
 */


import express from 'express';
import * as bookController from '../controllers/book.controller';
import * as Validator from '../validators/validator';

const router = express.Router();

//route to add book
router.post('/addbook', Validator.bookValidator, bookController.newBook);

export default router;
