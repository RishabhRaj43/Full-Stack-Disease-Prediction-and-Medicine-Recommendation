import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exists"],
      match: [/^\d{10}$/, "Please enter a valid phone number"],
    },
    gender: {
      type: String,
      default: "Prefer not to say",
      enum: ["male", "female"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isTokenVerified: {
      type: Boolean,
      default: false,
    },
    specialization: {
      type: [String],
      required: true,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    experience: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "https://www.pngarts.com/files/3/Avatar-PNG-Download-Image.png",
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorPost",
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
