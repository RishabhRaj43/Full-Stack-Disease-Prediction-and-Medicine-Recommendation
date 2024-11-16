import moongoose from "mongoose";

const postSchema = new moongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DoctorPost = moongoose.model("DoctorPost", postSchema);
export default DoctorPost;
