import Doctor from "../../../Model/Doctor/Doctor.model.js";
import DoctorPost from "../../../Model/Doctor/Post.model.js";
import User from "../../../Model/User/User.model.js";

export const getDoctorPosts = async (req, res) => {
  try {
    const posts = await DoctorPost.find({})
      .populate("doctorId")
      .sort({ createdAt: -1 })
      .limit(7);

    const userId = req.user._id;
    return res.status(200).json({ posts, userId });
  } catch (error) {
    console.log("Error in getDoctorPosts: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const likeDoctorPost = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await DoctorPost.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    req.user.likedPosts.push(post._id);
    post.likes.push(req.user._id);
    await Promise.all([await req.user.save(), await post.save()]);

    return res
      .status(200)
      .json({ message: "Post liked successfully", likes: post.likes });
  } catch (error) {
    console.log("Error in likeDoctorPost: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const unlikeDoctorPost = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await DoctorPost.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    req.user.likedPosts.pull(postId);
    post.likes.pull(req.user._id);
    await Promise.all([await req.user.save(), await post.save()]);

    return res
      .status(200)
      .json({ message: "Post unliked successfully", likes: post.likes });
  } catch (error) {
    console.log("Error in unlikeDoctorPost: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFavPosts = async (req, res) => {
  try {
    const posts = await DoctorPost.find({ _id: { $in: req.user.likedPosts } })
      .populate("doctorId")
      .sort({ createdAt: -1 })
    return res.status(200).json({ posts, userId: req.user._id });
  } catch (error) {
    console.log("Error in getFavPosts: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
