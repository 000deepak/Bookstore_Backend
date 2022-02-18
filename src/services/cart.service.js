/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         cart.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Cart from '../models/cart.model';
import Book from '../models/book.model';

//add to cart
export const addCart = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let defaultQuantity = 1;
  if (req.body.quantity) {
    defaultQuantity = req.body.quantity;
  } else {
    defaultQuantity = 1;
  }

  /* 1.check for book availibilty */
  let checkBook = await Book.findOne({ _id: req.params.bookId });

  if (checkBook) {
    /* 2.check if cart for user is present else create */
    let checkCart = await Cart.findOne({ userId: req.body.data.userId });

    if (!checkCart) {
      //creating new cart
      let newCart = new Cart({
        userId: req.body.data.userId,
        book: [{ bookId: req.params.bookId, quantity: defaultQuantity }],
        isPurchased: false
      });

      const data = await newCart.save();

      response.status = 201;
      response.success = true;
      response.message = 'Book Added to with new Cart';
      response.data = data;
      return response;
    } else {
      //cart present

      //check if book is present in cart
      const getArrayBook = await checkCart.book.filter(
        (x) => x.bookId === req.params.bookId
      );

      if (getArrayBook.length != 0) {
        const Total_Quantity =
          Number(getArrayBook[0].quantity) + Number(defaultQuantity);

        if (Total_Quantity < 0) {
          // remove the exsisting book in cart
          await Cart.updateOne(
            { userId: req.body.data.userId },
            {
              $pull: {
                book: {
                  bookId: req.params.bookId
                }
              }
            }
          );
        } else {
          // remove the exsisting book in cart
          await Cart.updateOne(
            { userId: req.body.data.userId },
            {
              $pull: {
                book: {
                  bookId: req.params.bookId
                }
              }
            }
          );
          // insert the new book in cart
          const updatedBook = {
            bookId: req.params.bookId,
            quantity: Total_Quantity
          };

          const updated = await Cart.findOneAndUpdate(
            {
              userId: req.body.data.userId
            },
            {
              $addToSet: {
                book: updatedBook
              }
            }
          );
        }

        response.status = 200;
        response.success = false;
        response.message = `Cart Updated hi ${Total_Quantity}`;
        return response;
      } else {
        /* 4.cart doesnt contain book just pash book to book array & save*/

        const newBook = {
          bookId: req.params.bookId,
          quantity: defaultQuantity
        };

        checkCart.book.push(newBook);

        await checkCart.save();

        response.status = 200;
        response.success = false;
        response.message = 'Book Added To Cart';
        response.data = ' ';
        return response;
      }
    }
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Book Not Available';
    response.data = ' ';
    return response;
  }
};

//get all Cart Books
export const getCart = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let checkCart = await Cart.findOne({ userId: req.body.data.userId });

  if (checkCart) {
    response.status = 200;
    response.success = true;
    response.message = 'Books Fetched';
    response.data = checkCart;
    return response;
  } else {
    response.status = 404;
    response.success = true;
    response.message = 'No Active Cart';
    response.data = ' ';
    return response;
  }
};

//update single Book
export const updateCart = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let defaultQuantity = 1;
  // if (req.body.quantity > 0) {
  //   defaultQuantity = req.body.quantity;
  // } else if (req.body.quantity < 0) {
    defaultQuantity = req.body.quantity;
  // } else {
  //   // defaultQuantity = 1;
  // }

  /* 1.check for book availibilty */
  let checkBook = await Book.findOne({ _id: req.params.bookId });

  if (checkBook) {
    /* 2.check if cart for user is present else create */
    let checkCart = await Cart.findOne({ userId: req.body.data.userId });

    if (!checkCart) {
      //creating new cart
      let newCart = new Cart({
        userId: req.body.data.userId,
        book: [{ bookId: req.params.bookId, quantity: defaultQuantity }],
        isPurchased: false
      });

      const data = await newCart.save();

      response.status = 201;
      response.success = true;
      response.message = 'Book Added to with new Cart';
      response.data = data;
      return response;
    } else {
      //cart present

      //check if book is present in cart
      const getArrayBook = await checkCart.book.filter(
        (x) => x.bookId === req.params.bookId
      );

      if (getArrayBook.length != 0) {
        // const Total_Quantity =
          // Number(getArrayBook[0].quantity) + Number(defaultQuantity);

        if (defaultQuantity <= 0) {
          // remove the exsisting book in cart
          await Cart.updateOne(
            { userId: req.body.data.userId },
            {
              $pull: {
                book: {
                  bookId: req.params.bookId
                }
              }
            }
          );
        } else {
          // remove the exsisting book in cart
          await Cart.updateOne(
            { userId: req.body.data.userId },
            {
              $pull: {
                book: {
                  bookId: req.params.bookId
                }
              }
            }
          );
          // insert the new book in cart
          const updatedBook = {
            bookId: req.params.bookId,
            quantity: defaultQuantity
          };

          const updated = await Cart.findOneAndUpdate(
            {
              userId: req.body.data.userId
            },
            {
              $addToSet: {
                book: updatedBook
              }
            }
          );
        }

        response.status = 200;
        response.success = false;
        response.message = 'Cart Updated ';
        return response;
      } else {
        /* 4.cart doesnt contain book just pash book to book array & save*/

        const newBook = {
          bookId: req.params.bookId,
          quantity: defaultQuantity
        };

        checkCart.book.push(newBook);

        await checkCart.save();

        response.status = 200;
        response.success = false;
        response.message = 'Book Added To Cart';
        response.data = ' ';
        return response;
      }
    }
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Book Not Available';
    response.data = ' ';
    return response;
  }
};
