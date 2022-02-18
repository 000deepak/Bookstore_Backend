/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         cart.model.js
 * @author       deepak
 * @since        1/2/2022
 *
 */

import { Schema, model } from 'mongoose';
const cartSchema = new Schema({
  userId: {
    type: String
  },
  book: [
    {
      bookId: {
        type: String
      },
      quantity: {
        type: Number
      }
    }
  ],
  isPurchased: {
    type: Boolean,
    default: false
  }
});

export default model('Cart', cartSchema);
