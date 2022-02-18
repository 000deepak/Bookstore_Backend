/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         Address.service.js
 * @author       deepak
 * @since        1/2/2022
 */

import Address from '../models/Address.model';

//add Customer
export const newAddress = async (body) => {
  let response = {
    status: 201,
    success: true,
    message: '',
    data: ''
  };

  let newAddress = new Address({
    fullName: body.fullName,
    phoneNo: body.phoneNo,
    pinCode: body.pinCode,
    locality: body.locality,
    address: body.address,
    city: body.city,
    state: body.state,
    landmark: body.landmark,
    addressType: body.addressType
  });

  const data = await Address.create(newAddress);

  response.status = 201;
  response.success = true;
  response.message = 'Address Added';
  response.data = data;
  return response;
};
