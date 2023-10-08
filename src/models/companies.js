import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, 'Please enter the company name'],
      minlength: [3, 'The company name must be at least 3 characters long'],
      maxlength: [50, 'The company name must be at most 50 characters long']
    },
    telephone_number: {
      type: String,
      minlength: [8, 'The telephone number must be at least 8 characters long'],
      maxlength: [
        16,
        'The telephone number must be at most 16 characters long'
      ],
      default: null
    },
    is_active: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      minlength: [10, 'The address must be at least 10 characters long'],
      maxlength: [50, 'The address must be at most 50 characters long'],
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Company', userSchema);
