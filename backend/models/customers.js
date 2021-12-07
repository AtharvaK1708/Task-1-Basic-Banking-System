import mongoose from 'mongoose';

const customersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    accountNo: {
      type: Number,
      required: true,
    },
    accountBalance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model('Customers', customersSchema);

export default Customers;
