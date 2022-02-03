/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         address.model.js
 * @author       deepak
 * @since        1/2/2022
 */

import { Schema, model } from 'mongoose';

const customerSchema = new Schema(
  {
    addressType: {
      type: String,
      default: "Home",
      required: true
    },
    fullAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Customers', customerSchema);