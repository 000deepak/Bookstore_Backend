/**
 * @purpose      To validate data
 * @module       validators
 * @description  validate data for various inputs
 * @author       deepak
 * @version      1.0 
 * @since        1/2/2022
 * 
 */

import Joi from 'joi';

//--------------------------------------------userValidator

export const userValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(20).required(),

    lastName: Joi.string().alphanum().min(2).max(20).required(),

    email: Joi.string().email().required(),

    password: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
//--------------------------------------------userLoginValidator

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//--------------------------------------------BookValidator

export const passwordValidator = (req, res, next) => {
  const schema = Joi.object({
    confirmPassword: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
  });
  const { error, value } = schema.validate({
    confirmPassword: req.body.confirmPassword
  });
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//--------------------------------------------BookValidator

export const emailValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//--------------------------------------------BookValidator
export const bookValidator = (req, res, next) => {
  const schema = Joi.object({
    bookName: Joi.string()
      .min(3)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    author: Joi.string()
      .min(2)
      .max(20)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    quantity: Joi.number().allow(null, ''),
    price: Joi.number().allow(null, ''),
    discountPrice: Joi.number().allow(null, ''),
    description: Joi.string().allow(null, ''),
    wishlist: Joi.boolean().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//--------------------------------------------AddressValidator
export const addressValidator = (req, res, next) => {
  const schema = Joi.object({
    addressType: Joi.string()
      .min(3)
      .max(10)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    fullAddress: Joi.string()
      .min(2)
      .max(50)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    city: Joi.string().allow(null, ''),
    state: Joi.string().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

//--------------------------------------------OrderValidator
export const orderValidator = (req, res, next) => {
  const schema = Joi.object({
    product_id: Joi.number().allow(null, ''),

    product_name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .pattern(new RegExp('^[a-zA-Zs]+$')),

    product_quantity: Joi.number().allow(null, ''),

    product_price: Joi.number().allow(null, '')
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
