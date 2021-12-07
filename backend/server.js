import express from 'express';
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

import dotenv from 'dotenv';
import connectDb from './connectDb.js';
const app = express();

dotenv.config();

connectDb();

app.use(express.json());

app.use('/api/customers', customerRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
