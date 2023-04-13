import mongoose from "mongoose";
import { createHmac } from 'crypto';

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
}, { timestamps: true });

userSchema.methods = {
  authencated(password) {
    try {
      return this.password == this.encrytPassword(password);
    } catch (error) {
      console.log(error);
    }

  },
  encrytPassword(password) {
    if (!password) return '';
    try {
      return createHmac('sha256', 'abcs').update(password).digest('hex');
    } catch (error) {
      return '';
    }
  }
}

userSchema.pre('save', function (next) {
  try {
    this.password = this.encrytPassword(this.password);
    next()
  } catch (error) {
    console.log(error);
  }
})

export default mongoose.model('User', userSchema)