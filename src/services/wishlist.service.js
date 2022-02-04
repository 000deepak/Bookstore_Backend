/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Wishlist.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

//add to Wishlist
export const addWishlist = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  console.log(body.book);
  console.log(body.book[0].bookId, 'bookId');
  console.log(body.book[0].quantity, 'quantity');

  //1.check for book availibilty
  let checkBook = await Book.findOne({ _id: body.book[0].bookId });

  console.log(checkBook, 'availability');

  if (checkBook) {
    let checkWishlist = await Wishlist.findOne({ userId: body.data.userId });

    console.log(checkWishlist, 'checkWishlist');

    //check if Wishlist for user is present
    if (!checkWishlist) {
      let newItem = new Wishlist({
        userId: body.data.userId,
        book: [
          { bookId: body.book[0].bookId, quantity: body.book[0].quantity }
        ],
        isPurchased: body.isPurchased
      });

      console.log(newItem, 'new Item');

      const data = await Wishlist.create(newItem);

      response.status = 201;
      response.success = true;
      response.message = 'Book Added to Wishlist';
      response.data = data;
      return response;
    } else {
      //if Wishlist presemt
      let book = { bookId: body.bookId };

      //3.check if book present
      let foundBook = await Wishlist.findOne({ bookId: body.bookId });

      // console.log(body.data.userId, body.bookId);
      console.log(foundBook, 'found book');

      if (/* foundBook */ false) {
        console.log(foundBook.book[0]);

        //if book present update
        foundBook.book[0].quantity = foundBook.book[0].quantity + 1;

        console.log(foundBook.book[0].quantity);

        const data = await Wishlist.findByIdAndUpdate(
          { _id: foundBook._id },
          foundBook,
          {
            new: true
          }
        );

        response.status = 200;
        response.success = false;
        response.message = 'Wishlist Updated';
        response.data = data;
        return response;
      } else {
        console.log('else');
        //if book not present add book to Wishlist
        const newBook = {
          bookId: body.book[0].bookId,
          quantity: body.book[0].quantity
        };

        checkWishlist.book.push(newBook, 'newBook');

        console.log(checkWishlist, 'push result');

        // checkWishlist.save();
        Wishlist.create(checkWishlist);

        response.status = 200;
        response.success = false;
        response.message = 'book added';
        response.data = ' ';
        return response;
      }
    }
  } else {
    //for book availibilty
    response.status = 200;
    response.success = false;
    response.message = 'Book Not Available';
    response.data = ' ';
    return response;
  }
};

//get all Wishlist Books
export const getWishlist = async (body) => {
  const data = await Wishlist.find({ userId: body.data.userId });

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

//update wishlist
export const updateWishlist = async (bookId, body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let book = { userId: body.data.userId, bookId: bookId };

  let foundBook = await Wishlist.findOne(book);

  console.log(book, foundBook);

  if (foundBook) {
    foundBook.quantity = body.quantity;

    const data = await Wishlist.findByIdAndUpdate(
      { _id: foundBook._id, userId: body.data.userId, bookId: bookId },
      foundBook,
      {
        new: true
      }
    );
    response.status = 200;
    response.success = true;
    response.message = 'Wishlist Updated';
    response.data = data;
    return response;
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Wishlist Not Found';
    response.data = body;
    return response;
  }
};
