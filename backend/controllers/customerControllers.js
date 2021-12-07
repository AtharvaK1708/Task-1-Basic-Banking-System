import expressAsyncHandler from 'express-async-handler';

import Customers from '../models/customers.js';

export const getAllCustomers = expressAsyncHandler(async (req, res) => {
  const data = await Customers.find({});
  res.json(data);
});
