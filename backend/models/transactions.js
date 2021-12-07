import mongoose from 'mongoose';

const transactionsSchema = mongoose.Schema(
  {
    fromName: {
      type: String,
      required: true,
    },

    toName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model('Transactions', transactionsSchema);

export default Transactions;
