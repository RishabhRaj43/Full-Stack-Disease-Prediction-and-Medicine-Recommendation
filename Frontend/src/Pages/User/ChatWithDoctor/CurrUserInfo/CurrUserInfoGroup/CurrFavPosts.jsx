import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  dislikeDoctorPost,
  getFavPosts,
  likeDoctorPost,
} from "../../../../../Services/User/DoctorManagement/UserPost/UserPost";

const CurrFavPosts = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { res, userId } = await getFavPosts();
        setPosts(res.data.posts);
        setUserId(userId);
      } catch (error) {
        console.log("Error in fetchPosts: ", error);
        toast.error(error.response.data.message);
      }
    };
    fetchPosts();
  }, []);

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

  return (
    <div className="spcae-y-2 mt-20 flex flex-col">
      <h1 className="text-5xl mb-4 font-bold">Favourite Posts</h1>
      <hr className="border-t-2  border-gray-700 my-4 hover:opacity-100 transition-opacity duration-300 mr-5" />
      <div className="space-y-4 pr-4">
        {posts?.map((post) => (
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
              className="cursor-pointer"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrFavPosts;
