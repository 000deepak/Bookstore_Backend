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
    fullName: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    },
    pinCode: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    locality: {
      type: String,
      required: true
    },
    landmark: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
 
    },
    addressType: {
      type: String,
      default: 'Home',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('Customers', customerSchema);
