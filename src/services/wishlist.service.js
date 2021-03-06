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
export const newBook = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  //1.check for book availibilty
  let checkBook = await Book.findOne({ _id: req.params.bookId });

  if (checkBook) {
    let checkWishlist = await Wishlist.findOne({
      userId: req.body.data.userId
    });

    //check if Wishlist for user is present
    if (!checkWishlist) {
      let wishlist = new Wishlist({
        userId: req.body.data.userId,
        book: [{ bookId: req.params.bookId }]
      });

      const data = await Wishlist.create(wishlist);

      response.status = 201;
      response.success = true;
      response.message = 'Book Added to Wishlist';
      response.data = data;
      return response;
    } else {
      const checkBookInWishlist = await checkWishlist.book.filter(
        (x) => x.bookId === req.params.bookId
      );

      if (checkBookInWishlist.length == 0) {
        const newWish = {
          bookId: req.params.bookId
        };

        checkWishlist.book.push(newWish);

        await checkWishlist.save();

        response.status = 200;
        response.success = false;
        response.message = 'Wishlist Updated';
        response.data = checkWishlist;
        return response;
      } else {
        response.status = 409;
        response.success = false;
        response.message = 'Book Already Added';
        response.data = ' ';
        return response;
      }
    }
  } else {
    //for book availibilty
    response.status = 404;
    response.success = false;
    response.message = 'Book Not Available';
    response.data = ' ';
    return response;
  }
};

//get all Wishlist Books
export const getWishlist = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let checkWishlist = Wishlist.findOne({ userId: req.body.data.userId });

  if (checkWishlist) {
    const data = await Wishlist.findOne({ userId: req.body.data.userId });

    response.status = 200;
    response.success = true;
    response.message = 'Books Fetched';
    response.data = data;
    return response;
  } else {
    response.status = 404;
    response.success = true;
    response.message = 'No Active Wishlist Found';
    return response;
  }
};

//remove wishlist
export const removeWishlist = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let checkWishlist = await Wishlist.findOne({
    userId: req.body.data.userId
  });

  //check if Wishlist for user is present
  if (checkWishlist) {
    const checkBookInWishlist = await checkWishlist.book.filter(
      (x) => x.bookId === req.params.bookId
    );

    if (checkBookInWishlist.length !== 0) {
      console.log('inside removing book from wishlist');

      await Wishlist.updateOne(
        { userId: req.body.data.userId },
        {
          $pull: {
            book: {
              bookId: req.params.bookId
            }
          }
        }
      );

      response.status = 200;
      response.success = false;
      response.message = 'Book Removed from wishlist';
      response.data = checkWishlist;
      return response;
    } else {
      response.status = 404;
      response.success = false;
      response.message = 'Book Not Found In Wishlist';
      response.data = ' ';
      return response;
    }
  } else {
    response.status = 200;
    response.success = false;
    response.message = 'No Active Wishlist';
    response.data = ' ';
    return response;
  }
};
