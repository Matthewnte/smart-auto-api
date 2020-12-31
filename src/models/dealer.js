const mongoose = require('mongoose');
const validate = require('validator').default;
const bcrypt = require('bcryptjs');

class validators {
  /**
   * @description Check that password is properly confirmed
   */
  static confirmPassword() {
    return function validation(val) {
      return val === this.confirmPassword;
    };
  }

  /**
   * @description Check that password is properly confirmed
   */
  static isMobilePhone() {
    return function validation(val) {
      return validate.isMobilePhone(val, 'en-NG', { strictMode: true });
    };
  }
}

const dealerSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: 'Company name is required',
      minlength: [5, 'Company name must be at least 5 characters'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: 'Email field is required',
      validate: [validate.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
      validate: [
        validators.confirmPassword(),
        'Please confirm password to be the same',
      ],
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/daygucgkt/image/upload/v1602758572/blank-profile-picture-973460_1280_gbyj3p.png',
    },
    photoId: String,
    address: {
      type: String,
      required: 'Address is required',
      minlength: [20, 'Address must be at least 20 characters'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      index: true,
      required: 'Email field is required',
      validate: [
        validators.isMobilePhone(),
        'Enter a valid phone number',
      ],
    },
  },
  { timestamps: true },
);

dealerSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

module.exports = mongoose.model('Dealer', dealerSchema);
