const mongoose = require('mongoose');
const validate = require('validator');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: 'First name is required' },
    lastName: { type: String, required: 'Last name is required' },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      validate: [validate.isEmail, 'Please enter a valid email'],
    },
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
    salt: String,
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
