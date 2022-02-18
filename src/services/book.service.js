/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Book.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Book from '../models/book.model';

//create new Book
export const newBook = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };
  let bookName = { bookName: body.bookName };

  let foundBook = await Book.findOne(bookName);

  if (!foundBook) {
    let newBook = new Book({
      bookName: body.bookName,
      author: body.author,
      description: body.description,
      quantity: body.quantity,
      price: body.price,
      discountPrice: body.discountPrice
    });

    const data = await Book.create(newBook);

    response.status = 201;
    response.success = true;
    response.message = 'Book Added';
    response.data = data;
    return response;
  } else {
    response.status = 409;
    response.success = false;
    response.message = 'Book Already Exists';
    response.data = body;
    return response;
  }
};

//get all Books
export const getBooks = async () => {
  const data = await Book.find();

  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  response.status = 200;
  response.success = true;
  response.message = 'Books Fetched';
  response.data = data;
  return response;
};
