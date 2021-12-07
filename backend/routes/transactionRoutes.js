import express from 'express';
import {
  getAllTransactions,
  addNewTransaction,
} from '../controllers/transactionControllers.js';

const router = express.Router();

router.route('/').get(getAllTransactions).post(addNewTransaction);

export default router;
