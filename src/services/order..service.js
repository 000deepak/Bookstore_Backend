/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         order.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Order from '../models/order.model';

//-----------------------------------------------Order

//add Order
export const newOrder = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let newOrder = new Order({
    product_id: body.product_id,
    product_name: body.product_name,
    product_quantity: body.product_quantity,
    product_price: body.product_price
  });

  const data = await Order.create(newOrder);

  response.status = 201;
  response.success = true;
  response.message = 'Order Added';
  response.data = data;
  return response;
};
