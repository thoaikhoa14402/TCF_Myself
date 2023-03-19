import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true, // transform an email into lower case
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  phoneNumber: String,
  gender: String,
  birthday: String,
  address: String,
  status: {
    type: String,
    default: 'active',
  },
  role: {
    type: String,
    enum: ['customer', 'employee', 'admin'],
    default: 'customer',
  },
  password: {
    type: String,
    require: [true, 'Please provide a password'],
    minLength: [8, 'Password length must be greater or equal to 8'],
    select: false, // never show up password field in the output if select === false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
    select: false, // never show up password confirm field in the output if select === false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: [String],
});

// pre middleware
// used on save or create
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// compare password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check users if they changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10); // convert from ms to second
    return JWTTimestamp < changedTimestamp; // ex: 100 < 200
  }
  // FALSE means not changed
  return false;
};

// create user model from user schema
const User = mongoose.model('User', userSchema);

export default User;
