import expressAsyncHandler from 'express-async-handler';

import Transactions from '../models/transactions.js';
import Customers from '../models/customers.js';

export const getAllTransactions = expressAsyncHandler(async (req, res) => {
  const data = await Transactions.find({});
  res.json(data);
});

export const addNewTransaction = expressAsyncHandler(async (req, res) => {
  try {
    const { fromName, toName, amount } = req.body;
    const fromCustomer = await Customers.findOne({ name: fromName });
    const toCustomer = await Customers.findOne({ name: toName });

    if (!fromCustomer || !toCustomer) {
      res.status(400);
      res.send('no user');
    }

    const user = await Transactions.create({
      fromName: fromName,
      toName: toName,
      amount: amount,
    });

    const fromCustomersBalance = fromCustomer.accountBalance;
    const toCustomersBalance = toCustomer.accountBalance;

    const query = await Customers.findOneAndUpdate(
      { name: fromName },
      { accountBalance: fromCustomersBalance - Number(amount) }
    );
    const query1 = await Customers.findOneAndUpdate(
      { name: toName },
      { accountBalance: toCustomersBalance + Number(amount) }
    );

    res.json({
      fromCustomer,
      toCustomersBalance,
      message: 'SUCCESSFUL',
    });
  } catch (error) {
    res.json(error);
  }
});
