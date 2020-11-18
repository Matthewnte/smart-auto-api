const mongoose = require('mongoose');
// const validate = require('validator');

const dealerSchema = mongoose.Schema(
  {
    companyName: { type: String, required: 'Compauny name is required' },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/daygucgkt/image/upload/v1602758572/blank-profile-picture-973460_1280_gbyj3p.png',
    },
    photoId: String,
    password: {
      type: String,
      required: 'Password is required',
      minlength: [8, 'Password must be atleast 8 characters'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: 'Please confirm your password',
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: 'Password are not the same',
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Dealer', dealerSchema);
