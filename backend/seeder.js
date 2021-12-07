import mongoose from 'mongoose';
import Customers from './models/customers.js';
import Transactions from './models/transactions.js';
import dotenv from 'dotenv';
import connectDb from './connectDb.js';
import customers from './DATA/customers.js';
import transactions from './DATA/transactions.js';

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Customers.deleteMany();
    await Transactions.deleteMany();

    await Customers.insertMany(customers);
    await Transactions.insertMany(transactions);

    console.log('DATA IMPORTED');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Customers.deleteMany();
    await Transactions.deleteMany();

    console.log('DATA DELETED');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
