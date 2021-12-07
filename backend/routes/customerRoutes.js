import express from 'express';
import { getAllCustomers } from '../controllers/customerControllers.js';

const router = express.Router();

router.route('/').get(getAllCustomers);

export default router;
