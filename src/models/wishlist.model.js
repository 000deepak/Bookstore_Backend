/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         wishlist.model.js
 * @author       deepak
 * @since        1/2/2022
 */

import { Schema, model } from 'mongoose';

const wishListSchema = new Schema({
  userId: {
    type: String
  },
  book: [
    {
      bookId: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ]
});

export default model('Wishlist', wishListSchema);
