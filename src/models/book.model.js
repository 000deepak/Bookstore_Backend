/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         book.model.js
 * @author       deepak
 * @since        1/2/2022
 */

import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    },
    discountPrice: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model('Books', bookSchema);
