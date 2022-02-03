/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         UserService.js
 * @author       deepak
 * @since       1/2/2022
 */

//imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//create Db
import User from '../models/user.model';

//Signup service
export const signup = async (body) => {
  let email = { email: body.email };

  let foundUser = await User.find(email);

  console.log(foundUser.length);

  let len = foundUser.length;

  if (len == 0) {

    let newUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hash
    });
    console.log(newUser);

    let savedData = await User.create(newUser);

    let response = {
      status: 201,
      success: true,
      message: 'user registration successfull',
      data: savedData
    };
    return response;
  } else {
    let response = {
      status: 409,
      success: false,
      message: 'user already exists',
      data: body
    };
    return response;
  }
};


//login service
export const signin = async (body) => {
  let response = {
    success: true,
    message: '',
    data: ''
  };
  let email = { email: body.email };
  let foundUser = await User.find(email);

  return new Promise((resolve, reject) => {
    if (foundUser.length > 0) {
      bcrypt
        .compare(body.password, foundUser[0].password)
        .then((result) => {
          if (result) {
            let token = jwt.sign(
              { email: foundUser[0].email, userId: foundUser[0].id },
              'secret'
            );
            let obj = {
              firstName: foundUser[0].firstName,
              lastName: foundUser[0].lastName,
              userId: foundUser[0]._id,
              email: foundUser[0].email,
              token: token
            };

            (response.success = true), (response.message = 'Login Successfull');
            (response.data = obj), (response.status = 200);
            resolve(response);
          } else {
            (response.success = false),
              (response.message = 'Incorrect Password');
            (response.data = ''), (response.status = 401);
            reject(response);
          }
        })
        .catch((err) => {
          (response.success = false),
            (response.message = 'Error In Checking Password');
          (response.data = err), (response.status = 500);
          reject(response);
        });
    } else {
      (response.success = false), (response.message = 'User Not Found');
      (response.data = ''), (response.status = 404);
      reject(response);
    }
  });
};
