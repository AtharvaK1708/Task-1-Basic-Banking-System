import express from 'express';
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

import path from 'path';
const __dirname = path.resolve();

import dotenv from 'dotenv';
import connectDb from './connectDb.js';
import cors from 'cors';
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/customers', customerRoutes);
app.use('/api/transactions', transactionRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
