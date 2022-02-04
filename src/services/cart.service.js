/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         cart.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Cart from '../models/cart.model';
import Book from '../models/book.model';
import { get } from 'mongoose';

//-----------------------------------------------cart

//add to cart
export const addCart = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  console.log(body.book);
  console.log(body.book[0].bookId, 'bookId');
  console.log(body.book[0].quantity, 'quantity');

  /* 1.check for book availibilty */
  let checkBook = await Book.findOne({ _id: body.book[0].bookId });

  console.log(checkBook, 'availability');

  if (checkBook) {
    /* 2.check if cart for user is present else create */
    let checkCart = await Cart.findOne({ userId: body.data.userId });

    console.log(checkCart, 'checkcart');

    if (!checkCart) {
      //creating new cart
      let newItem = new Cart({
        userId: body.data.userId,
        book: [
          { bookId: body.book[0].bookId, quantity: body.book[0].quantity }
        ],
        isPurchased: body.isPurchased
      });

      console.log(newItem, 'new Item');

      const data = newItem.save();

      response.status = 201;
      response.success = true;
      response.message = 'Book Added to Cart';
      response.data = data;
      return response;
    } else {
      //cart exists now check if cart contains book

      // console.log(body.objectId, 'object id');

      // let foundBook = await Cart.findOne({
      //   userId: body.data.userId,
      //   bookId: body.bookId
      // });

      // console.log(body.data.userId, body.bookId);
      // console.log(foundBook, 'found book in cart');

      // if (foundBook) {
      /* 3.If cart contains book increase quantity*/

      // console.log(foundBook, 'inside updating quantity');
      // console.log(foundBook.book, 'inside updating array');
      // console.log(foundBook.book[0].bookId, 'inside updating array bookid');

      // console.log(x.bookId, body.book[0].bookId, 'inside updating array filter');
      const getArrayBook = await checkCart.book.filter(
        (x) => x.bookId === body.book[0].bookId
      );

      console.log(getArrayBook, 'got book from cart');

      if (getArrayBook.length!=0) {
        const Total_Quantity = (await getArrayBook[0].quantity) + body.quantity;

        // remove the exsisting book in cart
        await Cart.updateOne(
          {
            userId: body.data.userId
          },
          {
            $pull: {
              book: {
                bookId: body.book[0].bookId
              }
            }
          }
        );

        // insert the new book in cart
        const updatedBook = {
          bookId: body.book[0].bookId,
          quantity: Total_Quantity
        };

        checkCart.book.push(updatedBook);

        console.log(checkCart, 'push result');

        await checkCart.save();

        // const updated = await Cart.findOneAndUpdate(
        //   {
        //     userId: body.data.userId
        //   },
        //   {
        //     $addToSet: {
        //       book: Updated_Book_In_Cart
        //     }
        //   }
        // );

        // console.log(updated);

        //if book present update
        // foundBook.book[0].quantity = foundBook.book[0].quantity + 1;

        // console.log(foundBook.book[0].quantity);

        // const data = await Cart.findByIdAndUpdate(
        //   { _id: foundBook._id },
        //   foundBook,
        //   {
        //     new: true
        //   }
        // );

        response.status = 200;
        response.success = false;
        response.message = 'Cart Updated';
        response.data = updated;
        return response;
      } else {
        /* 4.cart doesnt contain book just pash book to book array & save*/
        console.log('else');

        const newBook = {
          bookId: body.book[0].bookId,
          quantity: body.book[0].quantity
        };

        console.log(newBook, 'new bok');

        // let userCart = await Cart.findById(checkCart._id);

        // console.log(userCart, 'Curretn UserCart');

        checkCart.book.push(newBook);

        console.log(checkCart, 'push result');

        await checkCart.save();

        response.status = 200;
        response.success = false;
        response.message = 'Book Added ';
        response.data = ' ';
        return response;
      }
    }
  } else {
    response.status = 200;
    response.success = false;
    response.message = 'Book Not Available';
    response.data = ' ';
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
export const removeCart = async (bookId, body) => {
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
      const data = await Cart.findByIdAndDelete({ bookId: bookId }, foundBook, {
        new: true
      });
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
