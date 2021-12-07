import expressAsyncHandler from 'express-async-handler';

import Transactions from '../models/transactions.js';
import Customers from '../models/customers.js';

export const getAllTransactions = expressAsyncHandler(async (req, res) => {
  const data = await Transactions.find({});
  // const fromCustomer = await Customers.findOne({_id: });
  res.json(data);
});

export const addNewTransaction = expressAsyncHandler(async (req, res) => {
  const { from, to, amount } = req.body;
  // console.log(req.body);
  const fromCustomer = await Customers.findOne({ name: from });
  const toCustomer = await Customers.findOne({ name: to });

  if (!fromCustomer || !toCustomer) {
    res.status(400);
    res.send('no user');
  }

  const fromName = fromCustomer.name;
  const toName = toCustomer.name;

  const user = await Transactions.create({
    fromName: fromName,
    toName: toName,
    amount: amount,
  });

  const fromCustomersBalance = fromCustomer.accountBalance;
  const toCustomersBalance = toCustomer.accountBalance;

  const query = await Customers.findOneAndUpdate(
    { name: from },
    { accountBalance: fromCustomersBalance - amount }
  );
  const query1 = await Customers.findOneAndUpdate(
    { name: to },
    { accountBalance: toCustomersBalance + amount }
  );

  console.log(fromCustomer.accountBalance, toCustomer.accountBalance);
  res.json({
    fromCustomer,
    toCustomersBalance,
    message: 'SUCCESSFUL',
  });
});
