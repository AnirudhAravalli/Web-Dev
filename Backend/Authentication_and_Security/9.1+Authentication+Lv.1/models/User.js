import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: 100,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    maxLength: 100
  }
});

export default mongoose.model("User", userSchema); 