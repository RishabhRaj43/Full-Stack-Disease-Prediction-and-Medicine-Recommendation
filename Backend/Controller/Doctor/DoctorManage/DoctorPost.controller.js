import DoctorPost from "../../../Model/Doctor/Post.model.js";

export const createDoctorPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new DoctorPost({
      doctorId: req.doctor._id,
      title,
      content,
    });

    const savedPost = await newPost.save();

    req.doctor.posts.push(savedPost._id);
    await req.doctor.save();

    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.log("Error in createDoctorPost: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteDoctorPost = async (req, res) => {
  try {
    const { postId } = req.body;

    await DoctorPost.findByIdAndDelete(postId);

    req.doctor.posts.pull(postId);
    await req.doctor.save();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deleteDoctorPost: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
