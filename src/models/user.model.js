/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         user.model.js
 * @author       deepak
 * @since        1/2/2022
 */


//imports
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
  
    },
    lastName: {
      type: String,

    },
    email: {
      type: String,
    
    },
    password: {
      type: String,
   
    },
  },
  {
    timestamps: true,
  }
);

export default model("Users", userSchema);
