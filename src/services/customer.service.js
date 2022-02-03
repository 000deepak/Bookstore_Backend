/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Address.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Address from '../models/Address.model';

//-----------------------------------------------Customer

//add Customer
export const newAddress = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let newAddress = new Address({
    addressType: body.addressType,
    fullAddress: body.fullAddress,
    city: body.city,
    state: body.state
  });

  const data = await Address.create(newAddress);

  response.status = 201;
  response.success = true;
  response.message = 'Address Added';
  response.data = data;
  return response;
};
