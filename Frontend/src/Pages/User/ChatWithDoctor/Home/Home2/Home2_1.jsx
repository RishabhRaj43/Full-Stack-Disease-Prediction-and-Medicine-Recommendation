import React, { useEffect, useState } from "react";
import {
  dislikeDoctorPost,
  getAllDoctorPosts,
  likeDoctorPost,
} from "../../../../../Services/User/DoctorManagement/UserPost/UserPost.js";
import toast from "react-hot-toast";

const Home2_1 = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleToggleLike = async (postId, isLiked) => {
    try {
      const res = isLiked
        ? await dislikeDoctorPost(postId)
        : await likeDoctorPost(postId);
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: res.data.likes };
          }
          return post;
        });
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in handleToggleLike: ", error);

      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { res, userId } = await getAllDoctorPosts();
        setUserId(userId);
        setPosts(res);
      } catch (error) {
        console.log("Get All Doctor Posts Error: ", error);
        toast.error(error.response.data.message);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col m-7 p-5 ">
      <h1 className="text-3xl font-bold px-3 text-center">
        Recent Posts By Doctors
      </h1>
      <div className="space-y-4 mt-4">
        {posts ? (
          posts.map((post) => {
            return (
              <div
                className="flex justify-between rounded-xl p-3 bg-slate-400 items-center space-x-4 shadow-xl"
                key={post._id}
              >
                <div className="flex space-x-4 items-center">
                  <img
                    src={post.doctorId.profilePhoto}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {post.title} by {post.doctorId.username}
                    </h2>
                    <p className="text-gray-600 pl-2">{post.content}</p>
                    <p className="text-gray-800 text-xs font-semibold">
                      {post.timeAgo}
                    </p>
                  </div>
                </div>
                <div
                  className="cursor-pointer flex items-center space-x-2"
                  onClick={() =>
                    handleToggleLike(post._id, post.likes.includes(userId))
                  }
                >
                  <img
                    src={
                      post.likes.includes(userId)
                        ? "/like-solid.svg"
                        : "/like-regular.svg"
                    }
                    className="w-6 h-auto"
                    alt="Like icon"
                  />
                  <p>{post.likes.length}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-between rounded-xl p-3 bg-slate-400 items-center space-x-4 shadow-xl">
            {" "}
            No Post Found Till Now!!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home2_1;
