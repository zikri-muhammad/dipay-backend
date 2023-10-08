import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      minlength: [2, 'Your name must be at least 2 characters long'],
      maxlength: [50, 'Your name must be at most 50 characters long']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
      minlength: [5, 'Your email must be at least 5 characters long'],
      maxlength: [255, 'Your email must be at most 255 characters long']
    },
    phone_number: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[0-9- ]+$/.test(v);
        },
        message: 'Invalid phone number format'
      },
      minlength: [8, 'Your phone number must be at least 8 characters long'],
      maxlength: [16, 'Your phone number must be at most 16 characters long']
    },
    jobtitle: {
      type: String,
      enum: {
        values: ['manager', 'director', 'staff'],
        message: 'Please select the correct job title'
      },
      default: 'staff'
    },
    company_id: {
      type: mongoose.Types.ObjectId,
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

export default mongoose.model('Employee', userSchema);
