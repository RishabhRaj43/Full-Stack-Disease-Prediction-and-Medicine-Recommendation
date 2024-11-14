import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // phoneNumber: {
    //   type: Number,
    //   required: [true, "Phone number is required"],
    //   unique: [true, "Phone number already exists"],
    //   match: [/^\d{10}$/, "Please enter a valid phone number"],
    // },
    gender: {
      type: String,
      default: "Prefer not to say",
      enum: ["male", "female", "Prefer not to say"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isTokenVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
