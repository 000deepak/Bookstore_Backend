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

  console.log(req.params.bookId);
  console.log(req.params.bookId, 'bookId');
  console.log(defaultQuantity, 'quantity');

  /* 1.check for book availibilty */
  let checkBook = await Book.findOne({ _id: req.params.bookId });

  console.log(checkBook, 'availability');

  if (checkBook) {
    /* 2.check if cart for user is present else create */
    let checkCart = await Cart.findOne({ userId: req.body.data.userId });

    console.log(checkCart, 'checkcart is present or not');

    if (!checkCart) {
      //creating new cart
      let newCart = new Cart({
        userId: req.body.data.userId,
        book: [{ bookId: req.params.bookId, quantity: defaultQuantity }],
        isPurchased: false
      });

      console.log(newCart, 'new Cart created');

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

      console.log(getArrayBook, 'got book from cart');

      if (getArrayBook.length != 0) {
        const Total_Quantity =
          Number(getArrayBook[0].quantity) + Number(defaultQuantity);

        console.log(getArrayBook[0].quantity, 'initial quantity');
        console.log(defaultQuantity, 'added quantity');
        console.log(Total_Quantity, 'total quantity');

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

        if (Total_Quantity > 0) {
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
        response.message = 'Cart Updated';
        return response;
      } else {
        /* 4.cart doesnt contain book just pash book to book array & save*/
        console.log('else');

        const newBook = {
          bookId: req.params.bookId,
          quantity: defaultQuantity
        };

        console.log(newBook, 'new bok');

        checkCart.book.push(newBook);

        console.log(checkCart, 'push result');

        await checkCart.save();

        response.status = 200;
        response.success = false;
        response.message = 'Book Added To Cart';
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
export const getCart = async (req) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let checkCart = await Cart.findOne({ userId: req.body.data.userId });

  console.log(checkCart, 'checkcart is present or not');

  if (checkCart) {
    response.status = 200;
    response.success = true;
    response.message = 'Books Fetched';
    response.data = checkCart;
    return response;
  } else {
    response.status = 200;
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

  let checkCart = await Cart.findOne({ userId: req.body.data.userId });

  console.log(checkCart, 'checkcart is present or not');

  if (checkCart) {
    //check if book is present in cart
    const getArrayBook = await checkCart.book.filter(
      (x) => x.bookId === req.params.bookId
    );
    console.log(getArrayBook, 'got book from cart');

    if (getArrayBook.length !== 0) {
      let updatedCart = await Cart.updateOne(
        {
          userId: req.body.data.userId
        },
        {
          $pull: {
            book: {
              bookId: req.params.bookId
            }
          }
        }
      );
      response.status = 200;
      response.success = true;
      response.message = 'Cart Updated';
      response.data = ' ';
      return response;
    } else {
      response.status = 404;
      response.success = false;
      response.message = 'Book Not Found In Cart';
      response.data = ' ';
      return response;
    }
  } else {
    response.status = 404;
    response.success = false;
    response.message = 'Cart Not Found';
    response.data = ' ';
    return response;
  }
};
