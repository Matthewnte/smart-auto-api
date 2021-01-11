/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const validate = require('validator').default;
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: 'First name is required' },
    lastName: { type: String, required: 'Last name is required' },
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
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/daygucgkt/image/upload/v1602758572/blank-profile-picture-973460_1280_gbyj3p.png',
    },
    photoId: String,
    confirmEmailToken: String,
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
