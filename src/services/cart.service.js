/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         cart.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Cart from '../models/cart.model';
import Book from '../models/book.model';

//-----------------------------------------------cart

//add to cart
export const addCart = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let book = { bookId: body.bookId };

  let foundBook = await Cart.findOne({
    userId: body.data.userId,
    bookId: body.bookId
  });

  console.log(body.data.userId, body.bookId);

  console.log(foundBook, 'found book');

  if (!foundBook) {
    let newItem = new Cart({
      userId: body.data.userId,
      bookId: body.bookId,
      quantity: body.quantity,
      isPurchased: body.isPurchased
    });

    console.log(newItem, 'new Item');

    const data = await Cart.create(newItem);

    response.status = 201;
    response.success = true;
    response.message = 'Book Added to Cart';
    response.data = data;
    return response;
  } else {
    console.log(foundBook.quantity);

    foundBook.quantity = foundBook.quantity + 1;

    console.log(foundBook.quantity);

    const data = await Cart.findByIdAndUpdate(
      { _id: foundBook._id },
      foundBook,
      {
        new: true
      }
    );

    console.log('else');

    response.status = 200;
    response.success = false;
    response.message = 'Cart Updated';
    response.data = data;
    return response;
  }
};

//get all Cart Books
export const getCart = async (body) => {
  const data = await Cart.find({ userId: body.data.userId });

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

//get single Book from cart
export const getCartById = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let book = { userId: req.body.data.userId, bookId: req.params.bookId };

  let data = await Cart.findOne(book);

  console.log(book);

  if (data) {
    response.status = 200;
    response.success = true;
    response.message = 'Book Fetched';
    response.data = data;
    return response;
  } else {
    response.status = 404;
    response.success = true;
    response.message = 'Book Not Found';
    response.data = req.body;
    return response;
  }
};

//update single Book
export const updateCart = async (bookId, body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let book = { userId: body.data.userId, bookId: bookId };

  let foundBook = await Cart.findOne(book);

  console.log(book, foundBook);

  if (foundBook) {
    foundBook.quantity = body.quantity;

    const data = await Cart.findByIdAndUpdate(
      { _id: foundBook._id, userId: body.data.userId, bookId: bookId },
      foundBook,
      {
        new: true
      }
    );
    response.status = 200;
    response.success = true;
    response.message = 'Cart Updated';
    response.data = data;
    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Cart Not Found';
    response.data = body;
    return response;
  }
};

//remove single Book
export const removeCart = async (bookId,body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let book = { userId: body.data.userId, bookId: bookId };

  let foundBook = await Cart.findOne(book);

  console.log(book, foundBook);

  if (foundBook) {
    if (foundBook.quantity > 0) {

      foundBook.quantity = foundBook.quantity - 1;

      const data = await Cart.findByIdAndUpdate(
        { _id: foundBook._id, userId: body.data.userId, bookId: bookId },
        foundBook,
        {
          new: true
        }
      );
      response.status = 200;
      response.success = true;
      response.message = 'Cart Updated';
      response.data = data;
      return response;

      // _id: foundBook._id, userId: body.data.userId,
    } else if (foundBook.quantity == 0) {
      const data = await Cart.findByIdAndDelete(
        {  bookId: bookId },
        foundBook,
        {
          new: true
        }
      );
      response.status = 200;
      response.success = true;
      response.message = 'Cart Updated';
      response.data = data;
      return response;
    }
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Cart Not Found';
    response.data = body;
    return response;
  }
};

//delete single Book
export const removeBook = async (bookId) => {
  let data = await Cart.findByIdAndDelete(id);
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };
  response.status = 200;
  response.success = true;
  response.message = 'Book Deleted';
  response.data = data;
  return response;
};

//-----------------------------------------------------------------------------------------
